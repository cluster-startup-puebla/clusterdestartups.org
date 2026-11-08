import { Link } from "@/modules/cores/i18n/src/config/routing";
import { FounderAvatar } from "@/modules/features/founders/src";

interface OrgNodeProps {
  name: string;
  role: string;
  photo?: string;
  href?: string;
  featured?: boolean;
  photoClassName?: string;
}

export function OrgNode({
  name,
  role,
  photo,
  href,
  featured = false,
  photoClassName = "object-center",
}: OrgNodeProps) {
  const body = (
    <>
      <FounderAvatar
        name={name}
        photo={photo}
        className={`${featured ? "size-24 text-h3" : "size-16 text-body"} ${photoClassName}`}
      />
      <h3 className={`mt-4 font-display text-ink ${featured ? "text-h3" : "text-h4"}`}>
        <span className={href ? "group-hover:text-brand" : undefined}>{name}</span>
      </h3>
      <p className="mt-1 text-small text-ink-muted">{role}</p>
    </>
  );

  const className = "group flex w-full max-w-xs flex-col items-center px-2 text-center";

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
