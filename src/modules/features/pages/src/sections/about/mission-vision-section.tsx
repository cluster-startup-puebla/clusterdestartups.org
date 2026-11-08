interface MissionVisionSectionProps {
  kicker: string;
  title: string;
  association: string;
  lead: string;
  mission: { title: string; text: string };
  vision: { title: string; text: string };
}

export function MissionVisionSection({
  kicker,
  title,
  association,
  lead,
  mission,
  vision,
}: MissionVisionSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-16 lg:py-32">
      <div className="container-site">
        <p className="text-small text-ink-muted">{kicker}</p>
        <h1 className="mt-4 max-w-4xl text-h1 font-display text-ink lg:text-display">{title}</h1>

        <blockquote className="mt-12 max-w-4xl border-t border-line pt-10">
          <p className="text-h2 font-display text-ink">{vision.text}</p>
          <footer className="mt-6 text-small text-ink-muted">{vision.title}</footer>
        </blockquote>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-small text-ink-muted">{mission.title}</p>
            <p className="mt-4 max-w-xl text-body-lg text-ink">{mission.text}</p>
          </div>
          <div>
            <p className="text-small text-ink-muted">{association}</p>
            <p className="mt-4 max-w-xl text-body-lg text-ink-secondary">{lead}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
