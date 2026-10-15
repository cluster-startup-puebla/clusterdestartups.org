import type { HeroProps } from "./types";
import { HERO_VERSION } from "./version";
import { heroVersions } from "./versions";

const activeHero = heroVersions[HERO_VERSION];

export function Hero(props: HeroProps) {
  const Component = activeHero.Component;
  return <Component {...props} />;
}

export const heroPreload = activeHero.preload;
