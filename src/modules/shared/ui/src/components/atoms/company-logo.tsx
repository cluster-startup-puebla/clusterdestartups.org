"use client";

import { useTheme } from "@/modules/cores/theme/src/hooks/use-theme";

interface CompanyLogoProps {
  name: string;
  logo?: string;
  className?: string;
  dark?: boolean;
}

export function CompanyLogo({ name, logo, className = "size-14", dark = false }: CompanyLogoProps) {
  const { theme, mounted } = useTheme();

  if (logo) {
    const filter = mounted && dark && theme !== "dark" ? "brightness(0)" : "none";

    return (
      <span className={`${className} flex items-center justify-center rounded-md p-1.5`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} loading="lazy" className="h-full w-full object-contain" style={{ filter }} />
      </span>
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
