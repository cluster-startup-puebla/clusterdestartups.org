import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface StoriesProps {
  eyebrow: string;
  title: string;
  readLabel: string;
  locale: string;
  posts: PostMeta[];
}

export function Stories({ eyebrow, title, readLabel, locale, posts }: StoriesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-surface">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group flex flex-col overflow-hidden"
            >
              {post.image && <ImageFrame src={post.image.src} alt={post.image.alt} />}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <time dateTime={post.date} className="text-micro text-ink-muted">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <h3 className="text-h4 font-display text-ink">{post.title}</h3>
                <p className="text-small text-ink-secondary">{post.excerpt}</p>
                <span className="mt-auto text-small text-link">{readLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
