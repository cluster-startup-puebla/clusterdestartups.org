import type { HeroVersionId } from "../version";
import type { HeroVersion } from "../types";
import { heroV1 } from "./v1";
import { heroV2 } from "./v2";

export const heroVersions: Record<HeroVersionId, HeroVersion> = {
  v1: heroV1,
  v2: heroV2,
};
