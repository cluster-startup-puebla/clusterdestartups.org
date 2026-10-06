"use client";

import { useEffect } from "react";
import { track } from "./track";

const EVENT_HOSTS = [
  "docs.google.com",
  "forms.gle",
  "eventbrite.com",
  "eventbrite.mx",
  "lu.ma",
  "typeform.com",
  "unlocksummit.io",
  "meetup.com",
];

function isEventRegistration(href: string) {
  try {
    const url = new URL(href);
    if (EVENT_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) {
      return true;
    }
    return /google\.com\/forms/i.test(url.href);
  } catch {
    return false;
  }
}

export function AnalyticsClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link?.href) return;
      const href = link.href;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.includes("wa.me")) {
        track("clic_contacto", { link_url: href });
        return;
      }
      if (isEventRegistration(href)) {
        track("clic_registro_evento", { link_url: href });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
