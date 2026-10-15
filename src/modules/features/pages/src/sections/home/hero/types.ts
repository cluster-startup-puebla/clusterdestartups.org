import type { ReactNode } from "react";

export interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
}

export interface HeroPreload {
  href: string;
  imageSrcSet: string;
  imageSizes: string;
}

export interface HeroVersion {
  id: string;
  Component: (props: HeroProps) => ReactNode;
  preload: HeroPreload | null;
}
