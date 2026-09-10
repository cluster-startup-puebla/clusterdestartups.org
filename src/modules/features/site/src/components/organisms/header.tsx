"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { isHiddenSection } from "@/modules/cores/site/src/config/hidden-sections";
import { ThemeToggle } from "@/modules/cores/theme/src/components/theme-toggle";
import { LocaleSwitcher } from "@/modules/cores/i18n/src/components/locale-switcher";
import { Logo } from "@/modules/shared/ui/src/components";

const ITEMS: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/quienes-somos" },
  { key: "governance", href: "/gobernanza" },
  { key: "companies", href: "/empresas" },
  { key: "contact", href: "/contacto" },
].filter((item) => !isHiddenSection(item.href));

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/es" || pathname === "/en" || pathname === "/";
    return pathname.includes(href);
  };

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 24);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-bold focus:text-on-brand"
      >
        {t("skipToContent")}
      </a>

      <header
        className={`sticky top-0 z-50 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
          condensed ? "px-3 pt-2 sm:px-4 sm:pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ease-out motion-reduce:transition-none ${
            condensed
              ? "max-w-4xl rounded-full border border-line bg-surface/90 shadow-md backdrop-blur-md"
              : "max-w-none rounded-none border-b border-line bg-surface/90 backdrop-blur-md"
          }`}
        >
          <div className="container-site flex items-center justify-between gap-4 py-2">
            <Link
              href="/"
              aria-label={t("home")}
              className={`transition-[height] duration-300 ${
                condensed ? "h-7 sm:h-8" : "h-8 sm:h-10"
              }`}
            >
              <Logo className="h-full w-auto" />
            </Link>

            <nav className="hidden lg:block" aria-label={t("label")}>
              <ul className="flex items-center gap-4">
                {ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-micro transition ${
                        isActive(item.href)
                          ? "font-semibold text-brand"
                          : "text-ink-secondary hover:text-accent"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <button
                type="button"
                className="rounded-sm border border-line p-2 text-ink lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t("close") : t("open")}
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            className="mx-3 mt-2 rounded-md border border-line bg-surface shadow-md lg:hidden"
            aria-label={t("label")}
          >
            <ul className="flex flex-col p-4">
              {ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 text-body transition ${
                      isActive(item.href)
                        ? "font-semibold text-brand"
                        : "text-ink-secondary"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
