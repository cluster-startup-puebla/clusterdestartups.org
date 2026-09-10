#!/bin/bash
# Monitor opencode agents: detect finishes, commit & push changes
LOG_DIR="/Users/alvarocastillo/dev/cluster/clusterdestartups.org/logs"
LOG_FILE="$LOG_DIR/agents-monitor.log"
REPO="/Users/alvarocastillo/dev/cluster/clusterdestartups.org"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

mkdir -p "$LOG_DIR"

# State file to track known PIDS
STATE_FILE="$LOG_DIR/.known_pids"

# Get current opencode PIDS
CURRENT_PIDS=$(pgrep -f "^opencode$" 2>/dev/null | sort -n)
CURRENT_PIDS_ARR=($CURRENT_PIDS)

# Load previously known PIDS
KNOWN_PIDS=""
if [ -f "$STATE_FILE" ]; then
    KNOWN_PIDS=$(cat "$STATE_FILE")
fi
KNOWN_PIDS_ARR=($KNOWN_PIDS)

echo "=== Monitor: $TIMESTAMP ===" >> "$LOG_FILE"

# Find finished PIDS (were in known, not in current)
FINISHED=""
for kpid in "${KNOWN_PIDS_ARR[@]}"; do
    if [ -n "$kpid" ]; then
        FOUND=0
        for cpid in "${CURRENT_PIDS_ARR[@]}"; do
            if [ "$kpid" = "$cpid" ]; then
                FOUND=1
                break
            fi
        done
        if [ "$FOUND" -eq 0 ]; then
            FINISHED="$FINISHED $kpid"
        fi
    fi
done

# Find new PIDS
NEW=""
for cpid in "${CURRENT_PIDS_ARR[@]}"; do
    if [ -n "$cpid" ]; then
        FOUND=0
        for kpid in "${KNOWN_PIDS_ARR[@]}"; do
            if [ "$cpid" = "$kpid" ]; then
                FOUND=1
                break
            fi
        done
        if [ "$FOUND" -eq 0 ]; then
            NEW="$NEW $cpid"
        fi
    fi
done

# Save current PIDS as known
echo "$CURRENT_PIDS" > "$STATE_FILE"

# Report new agents
for pid in $NEW; do
    CWD=$(lsof -p $pid 2>/dev/null | grep cwd | awk '{print $NF}')
    echo "  [NEW] PID=$pid Dir=$CWD" >> "$LOG_FILE"
done

# Report finished agents and handle commits
for pid in $FINISHED; do
    echo "  [FINISHED] PID=$pid — checking for changes to commit..." >> "$LOG_FILE"

    # Get the CWD this agent was working on (check all possible repos)
    for REPO_DIR in "$REPO" "/Users/alvarocastillo/dev/card_ai" "/Users/alvarocastillo/dev/local-server"; do
        if [ -d "$REPO_DIR/.git" ]; then
            cd "$REPO_DIR" 2>/dev/null || continue

            CHANGES=$(git status --porcelain 2>/dev/null)
            if [ -n "$CHANGES" ]; then
                REPO_NAME=$(basename "$REPO_DIR")
                MODIFIED=$(git status --short | grep -c "^ M\|^M" 2>/dev/null || echo 0)
                ADDED=$(git status --short | grep -c "^??" 2>/dev/null || echo 0)
                DELETED=$(git status --short | grep -c "^ D\|^D" 2>/dev/null || echo 0)

                echo "  [CHANGES] $REPO_NAME: +$ADDED ~$MODIFIED -$DELETED" >> "$LOG_FILE"

                # Stage all changes
                git add -A 2>/dev/null

                # Create commit with timestamp and agent info
                COMMIT_MSG="auto: agent PID=$pid finished — $REPO_NAME

Changes: +$ADDED new, ~$MODIFIED modified, -$DELETED deleted
Timestamp: $TIMESTAMP"

                git commit -m "$COMMIT_MSG" 2>/dev/null
                if [ $? -eq 0 ]; then
                    echo "  [COMMITTED] $REPO_NAME" >> "$LOG_FILE"

                    # Push
                    BRANCH=$(git branch --show-current 2>/dev/null)
                    git push origin "$BRANCH" 2>/dev/null
                    if [ $? -eq 0 ]; then
                        echo "  [PUSHED] $REPO_NAME → origin/$BRANCH" >> "$LOG_FILE"
                    else
                        echo "  [PUSH FAILED] $REPO_NAME" >> "$LOG_FILE"
                    fi
                else
                    echo "  [COMMIT FAILED] $REPO_NAME" >> "$LOG_FILE"
                fi
            else
                echo "  [NO CHANGES] for PID=$pid" >> "$LOG_FILE"
            fi
        fi
    done
done

# Current status summary
echo "  Active agents: ${#CURRENT_PIDS_ARR[@]}" >> "$LOG_FILE"
for pid in "${CURRENT_PIDS_ARR[@]}"; do
    CWD=$(lsof -p $pid 2>/dev/null | grep cwd | awk '{print $NF}')
    ELAPSED=$(ps -p $pid -o etime= 2>/dev/null | xargs)
    CPU=$(ps -p $pid -o %cpu= 2>/dev/null | xargs)
    echo "    PID=$pid | CPU=${CPU}% | Uptime=$ELAPSED | $CWD" >> "$LOG_FILE"
done

echo "" >> "$LOG_FILE"

# Print last 20 lines to stdout
tail -25 "$LOG_FILE"
