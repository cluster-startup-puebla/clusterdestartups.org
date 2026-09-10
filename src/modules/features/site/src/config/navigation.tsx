import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { isHiddenSection } from "@/modules/cores/site/src/config/hidden-sections";

export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/quienes-somos" },
  { key: "governance", href: "/gobernanza" },
  { key: "hub", href: "/hub" },
  { key: "nodes", href: "/nodos" },
  { key: "alliances", href: "/alianzas" },
  { key: "memberships", href: "/membresias" },
  { key: "press", href: "/prensa" },
  { key: "contact", href: "/contacto" },
].filter((item) => !isHiddenSection(item.href));

export async function NavLinks({ className = "" }: { className?: string }) {
  const t = await getTranslations("Nav");

  return (
    <nav className={className} aria-label={t("label")}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-5">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block px-3 py-2 text-small text-ink-secondary transition hover:text-accent lg:px-0 lg:py-0"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
