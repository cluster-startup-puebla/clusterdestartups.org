"use client";

import { useState } from "react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { amozocPath, basePath, cholulaPath, pueblaPath, zacatlanPath } from "./puebla-map-paths";

export interface MapPlace {
  id: "zacatlan" | "puebla" | "amozoc" | "cholula";
  name: string;
  line: string;
  href: string;
}

interface PueblaMapProps {
  label: string;
  hint: string;
  places: MapPlace[];
}

const PATHS = [
  { id: "zacatlan" as const, d: zacatlanPath, fill: "fill-brand" },
  { id: "puebla" as const, d: pueblaPath, fill: "fill-brand" },
  { id: "amozoc" as const, d: amozocPath, fill: "fill-ink" },
  { id: "cholula" as const, d: cholulaPath, fill: "fill-brand-light" },
];

export function PueblaMap({ label, hint, places }: PueblaMapProps) {
  const [hoverId, setHoverId] = useState<MapPlace["id"] | null>(null);
  const [pinnedId, setPinnedId] = useState<MapPlace["id"] | null>(null);
  const activeId = hoverId ?? pinnedId;
  const active = places.find((place) => place.id === activeId);

  return (
    <div>
      <svg viewBox="0 0 640 820" role="img" aria-label={label} className="mx-auto h-auto w-full max-w-sm">
        <path d={basePath} className="fill-ink/10 stroke-surface-subtle" strokeWidth={0.8} />
        {PATHS.map((area) => {
          const place = places.find((item) => item.id === area.id);
          const on = activeId === area.id;
          return (
            <path
              key={area.id}
              d={area.d}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={place ? `${place.name}. ${place.line}` : area.id}
              className={`cursor-pointer stroke-surface-subtle outline-none focus-visible:stroke-brand ${area.fill} ${on ? "stroke-brand" : ""}`}
              strokeWidth={on ? 3 : 1.25}
              onMouseEnter={() => setHoverId(area.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(area.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => setPinnedId((current) => (current === area.id ? null : area.id))}
            />
          );
        })}
      </svg>
      <p className="mt-4 min-h-6 text-center text-body text-ink" aria-live="polite">
        {active ? (
          active.href ? (
            <Link href={active.href} className="text-link">
              {active.name}. {active.line}
            </Link>
          ) : (
            <span>
              {active.name}. {active.line}
            </span>
          )
        ) : (
          <span className="text-ink-muted">{hint}</span>
        )}
      </p>
    </div>
  );
}
