"use client";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = "", alt = "Clúster de Startups e Innovación A.C." }: LogoProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logos/logo-cluster.webp"
      alt={alt}
      className={className}
    />
  );
}
