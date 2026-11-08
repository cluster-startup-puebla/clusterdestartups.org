interface FounderAvatarProps {
  name: string;
  photo?: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((part) => part.length > 1)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function FounderAvatar({ name, photo, className = "size-12" }: FounderAvatarProps) {
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
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand font-display text-on-brand ${className}`}
    >
      {initials(name)}
    </span>
  );
}
