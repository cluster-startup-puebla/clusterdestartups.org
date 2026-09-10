interface CompanyLogoProps {
  name: string;
  logo?: string;
  className?: string;
}

export function CompanyLogo({ name, logo, className = "size-14" }: CompanyLogoProps) {
  if (logo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={logo} alt={name} loading="lazy" className={`${className} object-contain`} />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} flex items-center justify-center rounded-full border border-line bg-[radial-gradient(circle_at_35%_30%,var(--brand-primary),var(--brand-secondary)_70%,transparent_100%)] text-xl font-bold text-on-brand`}
    >
      {name.charAt(0)}
    </span>
  );
}
