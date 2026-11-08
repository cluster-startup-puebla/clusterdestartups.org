"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { isHiddenSection } from "@/modules/cores/site/src/config/hidden-sections";
import { ThemeToggle } from "@/modules/cores/theme/src/components/theme-toggle";
import { LocaleSwitcher } from "@/modules/cores/i18n/src/components/locale-switcher";
import { Logo } from "@/modules/shared/ui/src/components";

type NavLink = { key: string; href: string };
type NavEntry =
  | { type: "link"; key: string; href: string }
  | { type: "menu"; key: string; items: NavLink[] };

const NAV: NavEntry[] = [
  { type: "link", key: "home", href: "/" },
  {
    type: "menu",
    key: "aboutMenu",
    items: [
      { key: "about", href: "/quienes-somos" },
      { key: "governance", href: "/gobernanza" },
    ],
  },
  {
    type: "menu",
    key: "companies",
    items: [
      { key: "startups", href: "/empresas" },
      { key: "founders", href: "/fundadores" },
      { key: "universities", href: "/universidades" },
    ],
  },
  {
    type: "menu",
    key: "communication",
    items: [
      { key: "blog", href: "/blog" },
      { key: "media", href: "/medios" },
    ],
  },
  { type: "link", key: "contact", href: "/contacto" },
];

function visibleNav(entries: NavEntry[]): NavEntry[] {
  return entries.flatMap((entry): NavEntry[] => {
    if (entry.type === "link") {
      return isHiddenSection(entry.href) ? [] : [entry];
    }
    const items = entry.items.filter((item) => !isHiddenSection(item.href));
    if (items.length === 0) return [];
    if (items.length === 1) return [{ type: "link", key: items[0].key, href: items[0].href }];
    return [{ ...entry, items }];
  });
}

const ITEMS = visibleNav(NAV);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/es" || pathname === "/en" || pathname === "/";
  return pathname.includes(href);
}

function linkClass(active: boolean, mobile = false) {
  const color = active ? "font-semibold text-brand" : "text-ink-secondary hover:text-accent";
  return mobile ? `block py-3 text-body transition ${color}` : `text-micro transition ${color}`;
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 -top-32 z-[60] rounded-full bg-brand-dark px-5 py-3 font-bold text-on-brand focus:top-4"
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
                {ITEMS.map((entry) =>
                  entry.type === "link" ? (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        aria-current={isActive(pathname, entry.href) ? "page" : undefined}
                        className={linkClass(isActive(pathname, entry.href))}
                      >
                        {t(entry.key)}
                      </Link>
                    </li>
                  ) : (
                    <DesktopMenu
                      key={entry.key}
                      label={t(entry.key)}
                      items={entry.items}
                      pathname={pathname}
                      t={t}
                    />
                  ),
                )}
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
              {ITEMS.map((entry) =>
                entry.type === "link" ? (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      aria-current={isActive(pathname, entry.href) ? "page" : undefined}
                      className={linkClass(isActive(pathname, entry.href), true)}
                    >
                      {t(entry.key)}
                    </Link>
                  </li>
                ) : (
                  <li key={entry.key} className="pt-2">
                    <p className="py-2 text-micro uppercase tracking-wide text-ink-muted">{t(entry.key)}</p>
                    <ul className="border-l border-line pl-3">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={isActive(pathname, item.href) ? "page" : undefined}
                            className={linkClass(isActive(pathname, item.href), true)}
                          >
                            {t(item.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
              )}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

function DesktopMenu({
  label,
  items,
  pathname,
  t,
}: {
  label: string;
  items: NavLink[];
  pathname: string;
  t: ReturnType<typeof useTranslations<"Nav">>;
}) {
  const [open, setOpen] = useState(false);
  const active = items.some((item) => isActive(pathname, item.href));

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 ${linkClass(active || open)}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`absolute left-0 top-full z-50 pt-2 ${open ? "block" : "hidden"}`}>
        <ul className="min-w-44 rounded-md border border-line bg-surface py-1 shadow-md">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`block px-4 py-2 text-small transition ${
                  isActive(pathname, item.href)
                    ? "font-semibold text-brand"
                    : "text-ink-secondary hover:bg-surface-subtle hover:text-accent"
                }`}
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
