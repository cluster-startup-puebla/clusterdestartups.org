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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-cluster.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 m-auto h-1/2 w-auto opacity-[0.06] blur-[1px] dark:opacity-[0.08]"
          />
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
