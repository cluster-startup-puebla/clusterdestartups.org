import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { isHiddenSection } from "@/modules/cores/site/src/config/hidden-sections";
import { OFFICE_ADDRESS_LINE, OFFICE_MAPS_URL, OFFICE } from "@/modules/cores/site/src/config/site";
import { Logo } from "@/modules/shared/ui/src/components";

const FOOTER_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/quienes-somos" },
  { key: "governance", href: "/gobernanza" },
  { key: "companies", href: "/empresas" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contacto" },
].filter((item) => !isHiddenSection(item.href));

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-24 border-t border-line bg-surface-subtle py-16">
      <div className="container-site grid gap-12 md:grid-cols-3">
        <div>
          <Link href="/" className="inline-block h-14">
            <Logo className="h-full w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-small text-ink-secondary">{t("name")}</p>
        </div>

        <div>
          <p className="text-micro uppercase tracking-wide text-ink-muted">{t("hub")}</p>
          <a
            href={OFFICE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-small text-ink-secondary hover:text-link"
          >
            <span className="block font-medium text-ink">{OFFICE.place}</span>
            <span className="mt-1 block">{OFFICE_ADDRESS_LINE}</span>
          </a>
          <a href={`tel:${OFFICE.phoneTel}`} className="mt-3 inline-block text-small text-link">
            {t("phone")}: {OFFICE.phoneDisplay}
          </a>
          <a
            href={OFFICE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-small text-link"
          >
            {t("whatsapp")}: {OFFICE.phoneDisplay}
          </a>
        </div>

        <div>
          <p className="text-micro uppercase tracking-wide text-ink-muted">{t("links")}</p>
          <ul className="mt-3 space-y-2 text-small">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-link">
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.instagram.com/cluster_startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {t("instagram")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-line pt-6">
        <p className="text-micro text-ink-muted">
          © {new Date().getFullYear()} Clúster de Startups e Innovación (CSI) A.C. · {t("madeIn")}
          {" · "}
          <Link href="/aviso-de-privacidad" className="text-link">
            {t("privacy")}
          </Link>
          {" · "}
          <Link href="/aviso-de-cookies" className="text-link">
            {t("cookies")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
