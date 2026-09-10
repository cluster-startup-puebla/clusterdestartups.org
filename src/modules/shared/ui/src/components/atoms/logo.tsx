"use client";

import { useTheme } from "@/modules/cores/theme/src/hooks/use-theme";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = "", alt = "Clúster de Startups e Innovación A.C." }: LogoProps) {
  const { theme, mounted } = useTheme();

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo-cluster.webp"
      alt={alt}
      className={`${mounted && theme !== "dark" ? "[filter:brightness(0)]" : ""} ${className}`}
    />
  );
}
