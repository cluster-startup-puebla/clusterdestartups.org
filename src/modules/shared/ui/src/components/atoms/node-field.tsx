type Node = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  kind?: "disc" | "soft" | "ring";
};

const fields = {
  hero: [
    { x: 74, y: 18, size: 26, opacity: 0.25, kind: "soft" },
    { x: 92, y: 54, size: 11, opacity: 0.28, kind: "disc" },
    { x: 64, y: 74, size: 5.5, opacity: 0.32, kind: "disc" },
    { x: 96, y: 84, size: 3, opacity: 0.35, kind: "disc" },
    { x: 79, y: 37, size: 7, opacity: 0.3, kind: "ring" },
    { x: 8, y: 92, size: 16, opacity: 0.18, kind: "soft" },
    { x: 34, y: 96, size: 3, opacity: 0.25, kind: "disc" },
  ],
  sparse: [
    { x: 91, y: 14, size: 13, opacity: 0.2, kind: "soft" },
    { x: 4, y: 78, size: 16, opacity: 0.15, kind: "soft" },
    { x: 84, y: 88, size: 3.5, opacity: 0.28, kind: "disc" },
  ],
  dense: [
    { x: 90, y: 12, size: 18, opacity: 0.2, kind: "soft" },
    { x: 6, y: 52, size: 14, opacity: 0.16, kind: "soft" },
    { x: 95, y: 46, size: 4.5, opacity: 0.3, kind: "disc" },
    { x: 88, y: 74, size: 6, opacity: 0.25, kind: "ring" },
    { x: 3, y: 90, size: 3, opacity: 0.3, kind: "disc" },
  ],
} satisfies Record<string, readonly Node[]>;

export type NodeFieldVariant = keyof typeof fields;

export function NodeField({ variant = "sparse" }: { variant?: NodeFieldVariant }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {fields[variant].map((node, index) => {
        const shared = {
          left: `${node.x}%`,
          top: `${node.y}%`,
          width: `${node.size}%`,
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          opacity: node.opacity,
        };

        if (node.kind === "ring") {
          return (
            <span
              key={index}
              className="absolute block rounded-full"
              style={{
                ...shared,
                border: "1px solid var(--brand-primary)",
                boxShadow:
                  "0 0 24px -6px var(--brand-primary), inset 0 0 24px -10px var(--brand-primary)",
              }}
            />
          );
        }

        return (
          <span
            key={index}
            className="absolute block rounded-full"
            style={{
              ...shared,
              background:
                "radial-gradient(circle at 38% 32%, var(--brand-primary) 0%, var(--brand-secondary) 42%, color-mix(in oklab, var(--brand-primary-light) 70%, transparent) 68%, transparent 78%)",
              filter: node.kind === "soft" ? "blur(40px)" : "blur(6px)",
            }}
          />
        );
      })}
    </div>
  );
}
