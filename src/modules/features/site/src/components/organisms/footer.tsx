import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { isHiddenSection } from "@/modules/cores/site/src/config/hidden-sections";
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
          <p className="mt-3 text-small text-ink-secondary">{t("hubAddress")}</p>
          <p className="mt-2 text-small text-ink-muted">{t("hubCity")}</p>
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
          </ul>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-line pt-6">
        <p className="text-micro text-ink-muted">
          © {new Date().getFullYear()} Clúster de Startups e Innovación (CSI) A.C. · {t("madeIn")}
        </p>
      </div>
    </footer>
  );
}
