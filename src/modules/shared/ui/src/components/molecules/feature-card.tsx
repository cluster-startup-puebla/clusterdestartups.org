import { ImageFrame } from "../atoms/image-frame";

interface FeatureCardProps {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  image?: { src: string; alt: string };
  icon?: React.ReactNode;
  badge?: string;
}

export function FeatureCard({
  title,
  description,
  href,
  linkLabel,
  image,
  icon,
  badge,
}: FeatureCardProps) {
  const body = (
    <>
      {image && <ImageFrame src={image.src} alt={image.alt} />}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {icon && <div className="text-accent">{icon}</div>}
        {badge && <span className="badge-brand self-start">{badge}</span>}
        <h3 className="text-h4 font-display text-ink">{title}</h3>
        <p className="text-body text-ink-secondary">{description}</p>
        {href && linkLabel && (
          <span className="mt-auto text-small text-link">{linkLabel} →</span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="card group flex flex-col overflow-hidden transition hover:shadow-lg">
        {body}
      </a>
    );
  }

  return <div className="card flex flex-col overflow-hidden">{body}</div>;
}
