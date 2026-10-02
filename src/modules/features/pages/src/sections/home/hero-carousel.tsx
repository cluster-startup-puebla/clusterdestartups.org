"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { withNoteUtm } from "@/lib/utm";

const SLIDES = [
  {
    id: "cafe",
    src: "/blog/blog-cafe-cursor.webp",
    path: "/blog/cafe-cursor-puebla-2026/",
    frame: "object-[center_42%]",
    content: "hero-cafe-cursor",
  },
  {
    id: "innovafest",
    src: "/prensa/prensa-innovafest-queretaro.webp",
    path: "/blog/pabellon-puebla-innovafest-queretaro-2026/",
    frame: "object-center",
    content: "hero-innovafest",
  },
  {
    id: "sinergia",
    src: "/prensa/prensa-sinergia-clusteres-grupo.webp",
    path: "/blog/sinergia-clusteres-puebla-2026/",
    frame: "object-[center_62%]",
    content: "hero-sinergia",
  },
] as const;

const INTERVAL_MS = 7000;

export function HeroCarousel() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const paused = userPaused || holding || reduceMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  return (
    <div
      className="relative"
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
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/15 shadow-hero">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const href = withNoteUtm(`/${locale}${slide.path}`, slide.content, "home") ?? `/${locale}${slide.path}`;
          return (
            <a
              key={slide.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={active ? t(`hero.slides.${slide.id}.alt`) : ""}
                className={`h-full w-full scale-105 object-cover motion-reduce:transform-none ${slide.frame} ${active ? "motion-safe:animate-hero-drift" : ""}`}
                loading={slideIndex === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/80 via-navy/35 to-transparent" />
              <p className="absolute inset-x-5 bottom-8 text-small font-medium text-on-brand">
                {t(`hero.slides.${slide.id}.caption`)}
              </p>
            </a>
          );
        })}

        <div className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/20">
          <div
            key={index}
            className={`h-full w-full origin-left bg-brand motion-safe:animate-hero-progress motion-reduce:scale-x-100 ${paused ? "[animation-play-state:paused]" : ""}`}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${active ? "w-8 bg-brand" : "w-2 bg-white/40 hover:bg-white/70"}`}
                aria-current={active ? "true" : undefined}
                aria-label={t("hero.slideLabel", { current: slideIndex + 1, total: SLIDES.length })}
                onClick={() => setIndex(slideIndex)}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-on-brand hover:border-white/70"
          aria-pressed={userPaused}
          aria-label={userPaused ? t("hero.playLabel") : t("hero.pauseLabel")}
          onClick={() => setUserPaused((value) => !value)}
        >
          {userPaused ? <Play size={16} strokeWidth={1.75} /> : <Pause size={16} strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  );
}
