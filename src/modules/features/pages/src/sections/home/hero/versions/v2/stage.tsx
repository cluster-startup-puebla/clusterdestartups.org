"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { withNoteUtm } from "@/lib/utm";
import { SLIDES } from "./slides";

const IMAGE_SIZES = "(min-width: 1024px) 640px, 100vw";
const INTERVAL_MS = 7000;

export function HeroStage() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const paused = userPaused || holding || reduceMotion;

  const activate = useCallback((next: number) => {
    const wrapped = (next + SLIDES.length) % SLIDES.length;
    setIndex(wrapped);
    setSeen((visited) => {
      if (visited.has(wrapped)) return visited;
      const updated = new Set(visited);
      updated.add(wrapped);
      return updated;
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => activate(index + 1), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [activate, paused, index]);

  const slide = SLIDES[index];

  return (
    <div
      className="min-w-0"
      role="region"
      aria-roledescription="carrusel"
      aria-label={t("hero.carouselLabel")}
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocusCapture={() => setHolding(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHolding(false);
        }
      }}
    >
      <div className="relative aspect-[16/9] max-h-72 bg-navy lg:max-h-80">
        {SLIDES.map((item, slideIndex) => {
          if (!seen.has(slideIndex)) return null;
          const active = slideIndex === index;
          const href = withNoteUtm(`/${locale}${item.path}`, item.content, "home") ?? `/${locale}${item.path}`;
          return (
            <a
              key={item.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={!active}
              aria-label={active ? t(`hero.slides.${item.id}.alt`) : undefined}
              tabIndex={active ? 0 : -1}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes={IMAGE_SIZES}
                width={item.width}
                height={item.height}
                alt={active ? t(`hero.slides.${item.id}.alt`) : ""}
                className={`h-full w-full object-cover ${item.frame}`}
                decoding="async"
                loading={slideIndex === 0 ? "eager" : "lazy"}
                {...(slideIndex === 0 ? { fetchPriority: "high" as const } : {})}
              />
            </a>
          );
        })}
      </div>

      <p className="mt-4 text-small text-ink-secondary">{t(`hero.slides.${slide.id}.caption`)}</p>

      <div className="mt-5 flex items-end justify-between gap-6">
        <div className="flex items-end gap-5">
          {SLIDES.map((item, slideIndex) => {
            const active = slideIndex === index;
            const label = String(slideIndex + 1).padStart(2, "0");
            return (
              <button
                key={item.id}
                type="button"
                className="inline-flex min-h-11 min-w-11 flex-col items-start justify-end"
                aria-current={active ? "true" : undefined}
                aria-label={t("hero.slideLabel", { current: slideIndex + 1, total: SLIDES.length })}
                onClick={() => activate(slideIndex)}
              >
                <span
                  className={`font-display text-small tracking-normal ${active ? "text-ink" : "text-ink-muted"}`}
                >
                  {label}
                </span>
                <span
                  key={active ? index : `${item.id}-idle`}
                  className={`mt-2 h-0.5 w-16 origin-left ${active ? `bg-brand motion-safe:animate-hero-progress motion-reduce:scale-x-100 ${paused ? "[animation-play-state:paused]" : ""}` : "scale-x-0 bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink"
            aria-pressed={userPaused}
            aria-label={userPaused ? t("hero.playLabel") : t("hero.pauseLabel")}
            onClick={() => setUserPaused((value) => !value)}
          >
            {userPaused ? <Play size={16} strokeWidth={1.75} /> : <Pause size={16} strokeWidth={1.75} />}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center bg-ink text-surface"
            aria-label={t("hero.nextLabel")}
            onClick={() => activate(index + 1)}
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
