interface TripleHelixDiagramProps {
  label: string;
  government: string;
  academia: string;
  industry: string;
}

const CY = 220;
const X0 = 188;
const X1 = 524;
const AMP = 78;
const TURNS = 1;

type Point = [number, number];

function strandPoints(phase: number, from = 0, to = 1): Point[] {
  const steps = Math.max(12, Math.round((to - from) * 80));
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = from + ((to - from) * i) / steps;
    const envelope = 0.22 + 0.78 * Math.cos((t * Math.PI) / 2);
    const x = X0 + (X1 - X0) * t;
    const y = CY + envelope * AMP * Math.sin(TURNS * Math.PI * 2 * t + phase);
    pts.push([x, y]);
  }
  return pts;
}

function toPath(pts: Point[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
}

const STRANDS = [
  { id: "government", phase: -Math.PI / 2, stroke: "stroke-brand" },
  { id: "academia", phase: 0, stroke: "stroke-ink" },
  { id: "industry", phase: Math.PI / 2, stroke: "stroke-brand-light" },
] as const;

function Strand({
  phase,
  stroke,
  from,
  to,
}: {
  phase: number;
  stroke: string;
  from: number;
  to: number;
}) {
  const d = toPath(strandPoints(phase, from, to));
  return (
    <g>
      <path
        d={d}
        className="stroke-elevated"
        strokeWidth={28}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        className={stroke}
        strokeWidth={15}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const PASSES: { from: number; to: number; order: number[] }[] = [
  { from: 0, to: 0.36, order: [0, 1, 2] },
  { from: 0.34, to: 0.7, order: [2, 0, 1] },
  { from: 0.68, to: 1, order: [1, 2, 0] },
];

export function TripleHelixDiagram({ label, government, academia, industry }: TripleHelixDiagramProps) {
  const names = { government, academia, industry };

  return (
    <svg viewBox="0 108 660 228" role="img" aria-label={label} className="h-auto w-full">
      {PASSES.map((pass) =>
        pass.order.map((index) => {
          const strand = STRANDS[index];
          return (
            <Strand
              key={`${strand.id}-${pass.from}`}
              phase={strand.phase}
              stroke={strand.stroke}
              from={pass.from}
              to={pass.to}
            />
          );
        }),
      )}
      {STRANDS.map((strand) => {
        const y = CY + AMP * Math.sin(strand.phase);
        return (
          <text
            key={strand.id}
            x={168}
            y={y}
            textAnchor="end"
            dominantBaseline="central"
            className="fill-ink font-display"
            style={{ fontSize: 18, fontWeight: 600, fontStretch: "125%" }}
          >
            {names[strand.id]}
          </text>
        );
      })}
      <circle cx={578} cy={CY} r={44} className="fill-brand stroke-elevated" strokeWidth={4} />
      <text
        x={578}
        y={CY}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-on-brand font-display"
        style={{ fontSize: 16, fontWeight: 700, fontStretch: "125%" }}
      >
        CSI
      </text>
    </svg>
  );
}
