#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://clusterdestartups.org}"
FAIL=0

ok() { printf 'OK  %s\n' "$1"; }
bad() { printf 'FAIL %s\n' "$1"; FAIL=1; }

headers=$(curl -sI "$BASE/")
status=$(printf '%s' "$headers" | awk 'NR==1 {print $2}')
location=$(printf '%s' "$headers" | awk 'tolower($1)=="location:" {print $2}' | tr -d '\r')
if [[ "$status" == "301" && "$location" == *"/es/"* ]]; then
  ok "/ → 301 Location=/es/"
else
  bad "/ expected 301 to /es/ (got status=$status location=$location)"
fi

blog_html=$(curl -sS --compressed "$BASE/es/blog/")
blog_links=$(printf '%s' "$blog_html" | grep -o '/es/blog/' | wc -l | tr -d ' ')
if [[ "$blog_links" -ge 8 ]]; then
  ok "/es/blog/ contains $blog_links /es/blog/ links"
else
  bad "/es/blog/ expected ≥8 /es/blog/ links (got $blog_links)"
fi

robots=$(curl -sI "$BASE/robots.txt")
robots_status=$(printf '%s' "$robots" | awk 'NR==1 {print $2}')
robots_type=$(printf '%s' "$robots" | awk 'tolower($1)=="content-type:" {print $2}' | tr -d '\r')
if [[ "$robots_status" == "200" && "$robots_type" == text/plain* ]]; then
  ok "robots.txt 200 text/plain"
else
  bad "robots.txt expected 200 text/plain (got $robots_status $robots_type)"
fi

sitemap=$(curl -sS --compressed "$BASE/sitemap.xml")
if printf '%s' "$sitemap" | grep -q 'posible-puebla-2026' && printf '%s' "$sitemap" | grep -q 'semana-mundial-espacio-puebla-2026'; then
  ok "sitemap includes posible-puebla-2026 and semana-mundial-espacio-puebla-2026"
else
  bad "sitemap missing expected post slugs"
fi
if printf '%s' "$sitemap" | grep -q '<lastmod>'; then
  ok "sitemap has lastmod"
else
  bad "sitemap missing lastmod"
fi

missing=$(curl -sI "$BASE/no-existe")
missing_status=$(printf '%s' "$missing" | awk 'NR==1 {print $2}')
if [[ "$missing_status" == "404" ]]; then
  ok "/no-existe → 404"
else
  bad "/no-existe expected 404 (got $missing_status)"
fi

note_file=$(mktemp)
trap 'rm -f "$note_file"' EXIT
curl -sS --compressed -o "$note_file" "$BASE/es/blog/posible-puebla-2026/"
if grep -F -q 'og:image' "$note_file" && grep -F -q 'rel="canonical"' "$note_file" && grep -F -q 'application/ld+json' "$note_file"; then
  ok "note has og:image, canonical and JSON-LD"
else
  bad "note missing og:image, canonical or JSON-LD"
fi

if [[ "$FAIL" -ne 0 ]]; then
  exit 1
fi
printf 'All smoke checks passed against %s\n' "$BASE"
