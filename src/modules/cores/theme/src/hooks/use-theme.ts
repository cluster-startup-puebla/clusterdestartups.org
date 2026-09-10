"use client";

import { useEffect, useState } from "react";

function readTheme(): "dark" | "light" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [state, setState] = useState<{ theme: "dark" | "light"; mounted: boolean }>({
    theme: "light",
    mounted: false,
  });

  useEffect(() => {
    const update = () => setState({ theme: readTheme(), mounted: true });
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return state;
}
