import type { HeroVersion } from "../../types";
import { SLIDES } from "./slides";
import { HeroV2 } from "./hero";

const IMAGE_SIZES = "(min-width: 1024px) 640px, 100vw";

export const heroV2: HeroVersion = {
  id: "v2",
  Component: HeroV2,
  preload: {
    href: SLIDES[0].src,
    imageSrcSet: SLIDES[0].srcSet,
    imageSizes: IMAGE_SIZES,
  },
};
