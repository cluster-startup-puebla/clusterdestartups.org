"use client";

import { useTheme } from "@/modules/cores/theme/src/hooks/use-theme";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = "", alt = "Clúster de Startups e Innovación A.C." }: LogoProps) {
  const { theme, mounted } = useTheme();

  const filter = mounted && theme !== "dark" ? "brightness(0)" : "none";

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logos/logo-cluster.webp"
      alt={alt}
      className={className}
      style={{ filter }}
    />
  );
}
