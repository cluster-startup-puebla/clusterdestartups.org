import { Button } from "@/modules/shared/ui/src/components";
import type { HeroProps } from "../../types";
import { HeroStage } from "./stage";

/**
 * THESIS: The home hero is a poster. The promise is the type; the photograph sits on the same plane. Refuses the dark card-carousel.
 * OWN-WORLD: Paper field (surface-subtle), ink display, brand only on the word Startup, the index rule, the action, and a short foot slab.
 * STORY: The visitor reads the 2030 promise, sees the cluster in the field, and steps through three real scenes or into the ecosystem.
 * FIRST VIEWPORT: Eyebrow, stacked display title, short descriptor and primary button on the left. Sharp photograph, caption, and 01–03 index on the right. Brand slab centered at the foot.
 * FORM: Editorial poster (user reference). Light sheet, unframed photo, numbered sequence, color block leaving the frame.
 */
function PosterTitle({ title }: { title: string }) {
  const parts = title.split(/(\bStartup\b|\bstartup\b)/);

  return (
    <h1 className="mt-4 whitespace-pre-line font-display text-[clamp(2.15rem,3.2vw,3rem)] leading-[0.92] tracking-[-0.03em] text-ink">
      {parts.map((part, index) =>
        part === "Startup" || part === "startup" ? (
          <span key={index} className="text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </h1>
  );
}

export function HeroV2({ eyebrow, title, description, primaryCta }: HeroProps) {
  return (
    <section className="flex min-h-[calc(100svh-11.5rem)] flex-col bg-surface-subtle lg:min-h-[calc(100svh-11rem)]">
      <div className="container-site grid flex-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-12">
        <div>
          <p className="text-micro uppercase tracking-wider text-ink-secondary">{eyebrow}</p>
          <PosterTitle title={title} />
          <p className="mt-4 max-w-sm text-body text-ink-secondary">{description}</p>
          <div className="mt-5">
            <Button href="/quienes-somos">{primaryCta}</Button>
          </div>
        </div>
        <HeroStage />
      </div>
      <div className="flex justify-center" aria-hidden="true">
        <div className="h-12 w-32 bg-brand" />
      </div>
    </section>
  );
}
