import type { HeroVersion } from "../../types";
import { heroV1Preload } from "./slides";
import { HeroV1 } from "./hero";

export const heroV1: HeroVersion = {
  id: "v1",
  Component: HeroV1,
  preload: heroV1Preload,
};
