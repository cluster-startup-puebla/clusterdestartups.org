export const HIDDEN_SECTIONS = [
  "/membresias",
  "/alianzas",
  "/nodos",
  "/hub",
  "/prensa",
] as const;

export type HiddenSection = (typeof HIDDEN_SECTIONS)[number];

export function isHiddenSection(href: string): boolean {
  return HIDDEN_SECTIONS.some(
    (route) => href === route || href.startsWith(`${route}/`),
  );
}
