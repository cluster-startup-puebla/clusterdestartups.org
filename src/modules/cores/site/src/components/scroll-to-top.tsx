"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const positions = new Map<string, number>();
let restoreToken = 0;
let suppressRemember = false;

function stripTrailingSlash(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function locationKey() {
  return stripTrailingSlash(window.location.pathname);
}

function remember() {
  if (suppressRemember) return;
  positions.set(locationKey(), window.scrollY);
}

/** De `/es/fundadores/alguien` a `/es/fundadores`, o el equivalente en empresas y blog. */
function isReturnToParent(from: string, to: string) {
  const fromParts = stripTrailingSlash(from).split("/").filter(Boolean);
  const toParts = stripTrailingSlash(to).split("/").filter(Boolean);
  if (fromParts.length < 3 || toParts.length !== fromParts.length - 1) return false;
  return toParts.every((part, index) => part === fromParts[index]);
}

function scrollToTop() {
  restoreToken += 1;
  suppressRemember = true;
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
  window.requestAnimationFrame(() => {
    suppressRemember = false;
  });
}

function restoreScroll(y: number) {
  const token = ++restoreToken;
  suppressRemember = true;
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  let frames = 0;
  let stopped = false;
  const stop = () => {
    stopped = true;
    suppressRemember = false;
  };
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchmove", stop, { passive: true, once: true });

  const finish = () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    positions.set(locationKey(), y);
    suppressRemember = false;
    root.style.scrollBehavior = previous;
  };

  const tick = () => {
    if (token !== restoreToken) return;
    if (stopped) {
      root.style.scrollBehavior = previous;
      return;
    }
    const max = root.scrollHeight - window.innerHeight;
    window.scrollTo(0, y);
    frames += 1;
    const settled = max + 2 >= y && Math.abs(window.scrollY - y) < 2;
    if (settled || frames > 40) {
      finish();
      return;
    }
    window.requestAnimationFrame(tick);
  };

  tick();
}

export function ScrollToTop() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const navigation = useRef<"push" | "pop">("push");

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const onPop = () => {
      navigation.current = "pop";
      const y = positions.get(locationKey()) ?? 0;
      suppressRemember = true;
      window.requestAnimationFrame(() => {
        if (navigation.current !== "pop") return;
        navigation.current = "push";
        restoreScroll(y);
      });
    };
    const onScroll = () => remember();
    const onClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto|tel):/.test(href)) return;
      remember();
      suppressRemember = true;
      const fromKey = locationKey();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (locationKey() === fromKey) suppressRemember = false;
        });
      });
    };

    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, true);
    remember();

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  useLayoutEffect(() => {
    const from = previousPath.current;
    const to = pathname;
    previousPath.current = to;
    const kind = navigation.current;
    navigation.current = "push";
    const savedHere = positions.get(locationKey()) ?? 0;

    if (from === to && kind !== "pop") {
      suppressRemember = false;
      return;
    }

    if (kind === "pop" || isReturnToParent(from, to)) {
      restoreScroll(savedHere);
      return;
    }

    if (window.location.hash) {
      suppressRemember = false;
      return;
    }
    scrollToTop();
  }, [pathname]);

  return null;
}
