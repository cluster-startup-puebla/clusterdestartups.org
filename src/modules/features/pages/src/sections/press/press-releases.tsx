import { Badge, ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { BlogPost } from "@/modules/features/blog/src/interfaces/blog.interface";

interface PressReleasesProps {
  eyebrow: string;
  title: string;
  description: string;
  badgeLabel: string;
  entries: BlogPost[];
}

export function PressReleases({ eyebrow, title, description, badgeLabel, entries }: PressReleasesProps) {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        {entries.length === 0 ? (
          <p className="text-body text-ink-secondary">Próximamente.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="card group flex flex-col overflow-hidden transition hover:border-accent"
              >
                {entry.image && <ImageFrame src={entry.image.src} alt={entry.image.alt} />}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <time dateTime={entry.date} className="text-micro text-ink-muted">
                      {new Date(entry.date).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                    <Badge>{badgeLabel}</Badge>
                  </div>
                  <h3 className="text-h4 font-display text-ink">{entry.title}</h3>
                  <p className="text-small text-ink-secondary">{entry.excerpt}</p>
                  <span className="text-small mt-auto text-link group-hover:underline">
                    Leer comunicado →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
