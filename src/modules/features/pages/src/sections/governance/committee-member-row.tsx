import { ChevronRight } from "lucide-react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { FounderAvatar } from "@/modules/features/founders/src";
import type { CommitteeMember } from "@/data/committees";

interface CommitteeMemberRowProps {
  member: CommitteeMember;
  role: string;
  description?: string;
}

export function CommitteeMemberRow({ member, role, description }: CommitteeMemberRowProps) {
  const body = (
    <>
      <FounderAvatar
        name={member.name}
        photo={member.photo}
        className={`size-16 shrink-0 text-body ${member.photoClassName ?? "object-center"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block font-display text-h4 text-ink">
          <span className={member.href ? "group-hover:text-brand" : undefined}>{member.name}</span>
        </span>
        <span className="mt-1 block text-small text-ink-muted">{role}</span>
        {description ? (
          <span className="mt-2 block max-w-xl text-body text-ink-secondary">{description}</span>
        ) : null}
      </span>
      {member.href ? (
        <ChevronRight
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 text-ink-muted group-hover:text-brand"
        />
      ) : null}
    </>
  );

  const className = "group flex items-start gap-5 py-6";

  if (member.href?.startsWith("http")) {
    return (
      <a href={member.href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  if (member.href) {
    return (
      <Link href={member.href} className={className}>
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
