import { Badge, SectionHeader } from "@/modules/shared/ui/src/components";

interface LevelItem {
  code: string;
  name: string;
  description: string;
}

interface LevelGroup {
  label: string;
  note: string;
  items: LevelItem[];
}

interface LevelsProps {
  eyebrow: string;
  title: string;
  description: string;
  groups: LevelGroup[];
}

export function Levels({ eyebrow, title, description, groups }: LevelsProps) {
  return (
    <section className="bg-surface py-16 lg:py-32">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-h3 font-display text-ink">{group.label}</h3>
              <p className="mt-1 text-small text-ink-muted">{group.note}</p>
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <li key={item.code} className="card p-5">
                    <div className="flex items-center gap-3">
                      <Badge>{item.code}</Badge>
                      <h4 className="text-h4 font-display text-ink">{item.name}</h4>
                    </div>
                    <p className="mt-2 text-small text-ink-secondary">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
