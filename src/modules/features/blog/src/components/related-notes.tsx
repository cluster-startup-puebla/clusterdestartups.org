"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ImageFrame } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

const STORAGE_KEY = "csi-blog-recs";

interface StoredRecs {
  slug: string;
  shown: string[];
}

interface RelatedNotesProps {
  posts: PostMeta[];
  currentSlug: string;
}

function readStored(): StoredRecs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredRecs>;
    if (typeof parsed.slug !== "string" || !Array.isArray(parsed.shown)) return null;
    return {
      slug: parsed.slug,
      shown: parsed.shown.filter((slug): slug is string => typeof slug === "string"),
    };
  } catch {
    return null;
  }
}

function writeStored(value: StoredRecs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or a full quota should not block the article.
  }
}

/** Newest post stays; the other two rotate past whatever the previous note already showed. */
export function pickRelated(posts: PostMeta[], currentSlug: string, prev: StoredRecs | null): PostMeta[] {
  const pool = posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (pool.length <= 3) return pool;

  if (prev?.slug === currentSlug && prev.shown.length > 0) {
    const bySlug = new Map(pool.map((post) => [post.slug, post]));
    const kept = prev.shown
      .map((slug) => bySlug.get(slug))
      .filter((post): post is PostMeta => Boolean(post));
    if (kept.length >= 3) return kept.slice(0, 3);
  }

  const newest = pool[0];
  const omitted = new Set(prev && prev.slug !== currentSlug ? prev.shown : []);
  if (omitted.size === 0) return pool.slice(0, 3);

  const rotating = pool.filter((post) => post.slug !== newest.slug && !omitted.has(post.slug));
  let others = rotating.slice(0, 2);
  if (others.length < 2) {
    const fallback = pool.filter(
      (post) => post.slug !== newest.slug && !others.some((item) => item.slug === post.slug),
    );
    others = [...others, ...fallback].slice(0, 2);
  }

  return [newest, ...others];
}

export function RelatedNotes({ posts, currentSlug }: RelatedNotesProps) {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const [picked, setPicked] = useState<PostMeta[] | null>(null);

  useEffect(() => {
    const prev = readStored();
    const next = pickRelated(posts, currentSlug, prev);
    writeStored({ slug: currentSlug, shown: next.map((post) => post.slug) });
    setPicked(next);
  }, [posts, currentSlug]);

  if (!picked || picked.length === 0) return null;

  return (
    <section className="mt-16 border-t border-line pt-12" aria-labelledby="related-notes-heading">
      <h2 id="related-notes-heading" className="text-h3 font-display">
        {t("relatedTitle")}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {picked.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card group flex flex-col overflow-hidden transition hover:border-accent"
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
              <span className="text-small mt-auto text-ink-muted">
                {t("readingTime", { minutes: post.readingMinutes })}
              </span>
              <span className="text-small text-link group-hover:underline">{t("readMore")}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
