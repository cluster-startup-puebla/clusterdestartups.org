"use client";

import { routing, usePathname, useRouter } from "@/modules/cores/i18n/src/config/routing";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    router.replace(pathname, { locale: next as "es" | "en" });
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5 text-micro"
      role="group"
      aria-label="Idioma / Language"
    >
      <Languages size={14} className="text-ink-muted" aria-hidden="true" />
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={`rounded-full px-2 py-0.5 uppercase transition ${
            l === locale ? "bg-accent text-on-accent font-semibold" : "text-ink-secondary hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
