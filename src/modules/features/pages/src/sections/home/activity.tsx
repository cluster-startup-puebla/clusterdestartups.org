import { SectionHeader } from "@/modules/shared/ui/src/components";
import { PueblaMap, type MapPlace } from "./puebla-map";

export interface ActivityTotal {
  value: string;
  label: string;
}

export type ActivityPlace = MapPlace;

interface ActivityProps {
  eyebrow: string;
  title: string;
  description: string;
  mapLabel: string;
  hint: string;
  totals: ActivityTotal[];
  places: ActivityPlace[];
}

export function Activity({
  eyebrow,
  title,
  description,
  mapLabel,
  hint,
  totals,
  places,
}: ActivityProps) {
  return (
    <section className="bg-surface-subtle">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {totals.map((item) => (
            <p key={item.label}>
              <span className="block text-h1 font-display text-brand">{item.value}</span>
              <span className="mt-2 block text-body text-ink">{item.label}</span>
            </p>
          ))}
        </div>
        <div className="mt-12">
          <PueblaMap label={mapLabel} hint={hint} places={places} />
        </div>
      </div>
    </section>
  );
}
