interface ProfileCardProps {
  name: string;
  role: string;
  description?: string;
  image?: { src: string; alt: string };
  badge?: string;
}

export function ProfileCard({ name, role, description, image, badge }: ProfileCardProps) {
  return (
    <div className="card flex flex-col overflow-hidden">
      {image && (
        <div className="bg-elevated relative overflow-hidden border-b border-line" style={{ aspectRatio: "4 / 5" }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] dark:opacity-[0.08]">
            <span className="font-display text-3xl font-bold leading-tight tracking-tight text-ink">
              Clúster<br />de<br />STARTUPS<br />e INNOVACIÓN
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} loading="lazy" className="relative h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        {badge && <span className="badge-brand self-start">{badge}</span>}
        <h3 className="text-h4 font-display text-ink">{name}</h3>
        <p className="text-small font-medium text-accent">{role}</p>
        {description && <p className="mt-2 text-small text-ink-secondary">{description}</p>}
      </div>
    </div>
  );
}
