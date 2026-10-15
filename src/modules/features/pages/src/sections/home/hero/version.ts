export const HERO_VERSIONS = ["v1", "v2"] as const;

export type HeroVersionId = (typeof HERO_VERSIONS)[number];

/** Active home hero. Swap this id to mount another registered version. */
export const HERO_VERSION: HeroVersionId = "v2";
