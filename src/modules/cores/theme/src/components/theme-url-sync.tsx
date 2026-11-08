"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const THEME_PARAM = "theme";

type ThemeMode = "dark" | "light";

function readAppliedTheme(): ThemeMode {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function pathsMatch(routerPath: string, browserPath: string): boolean {
  const strip = (path: string) => (path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path);
  return strip(routerPath) === strip(browserPath);
}

function sameQuery(left: URLSearchParams, right: URLSearchParams): boolean {
  const keys = new Set([...left.keys(), ...right.keys()]);
  for (const key of keys) {
    const leftValues = left.getAll(key);
    const rightValues = right.getAll(key);
    if (leftValues.length !== rightValues.length) return false;
    for (let index = 0; index < leftValues.length; index += 1) {
      if (leftValues[index] !== rightValues[index]) return false;
    }
  }
  return true;
}

/**
 * Keeps `theme=dark|light` in the URL so a copied link opens in the same mode.
 * Writes through the Next router (not history.replaceState) so later filter
 * updates, which clone `searchParams`, keep the param.
 */
export function ThemeUrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sync = () => {
      if (!pathsMatch(pathname, window.location.pathname)) return;

      const applied = readAppliedTheme();
      const current = new URLSearchParams(searchParams.toString());
      const live = new URLSearchParams(window.location.search);
      // Skip while the router query and the address bar disagree, so a
      // not-yet-hydrated router cannot wipe params such as industry.
      if (!sameQuery(current, live)) return;
      if (current.get(THEME_PARAM) === applied) return;

      current.set(THEME_PARAM, applied);
      const qs = current.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [pathname, router, searchParams]);

  return null;
}
