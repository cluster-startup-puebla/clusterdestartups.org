import type { HeroPreload } from "../../types";

export const HERO_IMAGE_SIZES = "(min-width: 1024px) 560px, 100vw";

export const SLIDES = [
  {
    id: "cafe",
    src: "/blog/blog-cafe-cursor-800.webp",
    srcSet: "/blog/blog-cafe-cursor-800.webp 800w, /blog/blog-cafe-cursor.webp 1600w",
    width: 800,
    height: 450,
    path: "/blog/cafe-cursor-puebla-2026/",
    frame: "object-[center_42%]",
    content: "hero-cafe-cursor",
  },
  {
    id: "innovafest",
    src: "/prensa/prensa-innovafest-queretaro-800.webp",
    srcSet: "/prensa/prensa-innovafest-queretaro-800.webp 800w, /prensa/prensa-innovafest-queretaro.webp 1600w",
    width: 800,
    height: 450,
    path: "/blog/pabellon-puebla-innovafest-queretaro-2026/",
    frame: "object-center",
    content: "hero-innovafest",
  },
  {
    id: "sinergia",
    src: "/prensa/prensa-sinergia-clusteres-grupo-800.webp",
    srcSet: "/prensa/prensa-sinergia-clusteres-grupo-800.webp 800w, /prensa/prensa-sinergia-clusteres-grupo.webp 1280w",
    width: 800,
    height: 533,
    path: "/blog/sinergia-clusteres-puebla-2026/",
    frame: "object-[center_62%]",
    content: "hero-sinergia",
  },
] as const;

export const heroV1Preload: HeroPreload = {
  href: SLIDES[0].src,
  imageSrcSet: SLIDES[0].srcSet,
  imageSizes: HERO_IMAGE_SIZES,
};
