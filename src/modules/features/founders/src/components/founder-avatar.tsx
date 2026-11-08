import { User } from "lucide-react";

interface FounderAvatarProps {
  name: string;
  photo?: string;
  className?: string;
}

export function FounderAvatar({ photo, className = "size-12" }: FounderAvatarProps) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt=""
        className={`aspect-square shrink-0 rounded-full object-cover object-center ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-surface-subtle text-ink-muted ${className}`}
    >
      <User className="size-1/2" strokeWidth={2} />
    </span>
  );
}
