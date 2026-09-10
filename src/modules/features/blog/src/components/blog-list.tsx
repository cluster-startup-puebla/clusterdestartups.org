"use client";

import { useSearchParams } from "next/navigation";
import { Badge, ImageFrame } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

const PRESS = "sala-de-prensa";
const COMMUNITY = "comunidad";

interface BlogListProps {
  posts: PostMeta[];
  locale: string;
  labels: {
    all: string;
    press: string;
    community: string;
    readMore: string;
  };
}

export function BlogList({ posts, locale, labels }: BlogListProps) {
  const params = useSearchParams();
  const categoria = params.get("categoria");
  const visible =
    categoria === PRESS
      ? posts.filter((p) => p.category === PRESS)
      : categoria === COMMUNITY
        ? posts.filter((p) => p.category === COMMUNITY)
        : posts;

  const filters = [
    { value: null, label: labels.all, active: categoria !== PRESS && categoria !== COMMUNITY },
    { value: PRESS, label: labels.press, active: categoria === PRESS },
    { value: COMMUNITY, label: labels.community, active: categoria === COMMUNITY },
  ];

  return (
    <>
      <nav aria-label="Filtro de categoría" className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
            <Link
              key={filter.label}
              href={filter.value ? `/blog?categoria=${filter.value}` : "/blog"}
              className={`btn ${filter.active ? "btn-primary" : "btn-secondary"} px-5 py-2.5 text-small`}
              aria-pressed={filter.active}
            >
              {filter.label}
            </Link>
        ))}
      </nav>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card group flex flex-col overflow-hidden transition hover:border-accent"
          >
            {post.image && <ImageFrame src={post.image.src} alt={post.image.alt} />}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <time dateTime={post.date} className="text-micro text-ink-muted">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <Badge>
                  {post.category === PRESS ? labels.press : labels.community}
                </Badge>
              </div>
              <h2 className="text-h4 font-display text-ink">{post.title}</h2>
              <p className="text-small text-ink-secondary">{post.excerpt}</p>
              <span className="text-small mt-auto text-link group-hover:underline">
                {labels.readMore}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-body text-ink-secondary">No hay publicaciones en esta categoría todavía.</p>
      )}
    </>
  );
}
