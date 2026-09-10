import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { SITE_URL } from "@/modules/cores/site/src/config/site";
import { Badge, CompanyLogo } from "@/modules/shared/ui/src/components";
import { companies, getCompany, localize, type Company } from "@/data/companies";
import { toTelHref } from "@/lib/phone";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    companies.map((company) => ({ locale, slug: company.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};

  return buildMetadata({
    locale,
    route: `/empresas/${slug}`,
    title: company.name,
    description: company.solution
      ? localize(company.solution, locale)
      : `${company.name} · ${SITE_URL}`,
    images: company.logo ? [{ url: company.logo, alt: company.name }] : undefined,
  });
}

type ContactKey = "website" | "demo" | "email" | "phone";

async function CompanyDetail({ company, locale }: { company: Company; locale: string }) {
  const t = await getTranslations({ locale, namespace: "Companies" });

  const industries = company.industries
    ? localize(company.industries, locale)
    : [];
  const isPending = !industries.length && !company.problem && !company.solution;

  const contactEntries: {
    key: ContactKey;
    value?: string;
    href: string;
    external: boolean;
  }[] = [
    {
      key: "website",
      value: company.contact?.website,
      href: company.contact?.website ?? "",
      external: true,
    },
    {
      key: "demo",
      value: company.contact?.demo,
      href: company.contact?.demo ?? "",
      external: true,
    },
    {
      key: "email",
      value: company.contact?.email,
      href: company.contact?.email ? `mailto:${company.contact.email}` : "",
      external: false,
    },
    {
      key: "phone",
      value: company.contact?.phone,
      href: company.contact?.phone ? `tel:${toTelHref(company.contact.phone)}` : "",
      external: false,
    },
  ];

  const person = company.contact?.person;
  const hasLinks = contactEntries.some((entry) => entry.value);

  return (
    <article className="container-site py-16 lg:py-24">
      <Link href="/empresas" className="text-small text-link">
        ← {t("backToList")}
      </Link>

      <header className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <CompanyLogo name={company.name} logo={company.logo} className="size-20" dark={company.logoDark} />
        <div>
          <h1 className="text-h1 font-display text-ink">{company.name}</h1>
          <ul aria-label={t("detail.industry")} className="mt-4 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <li key={industry}>
                <Badge>{industry}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {isPending && (
        <p className="card mt-10 p-6 text-body text-ink-secondary">{t("pendingNote")}</p>
      )}

      <dl className="mt-12 grid gap-6 md:grid-cols-2">
        {(
          [
            { key: "problem", value: company.problem },
            { key: "solution", value: company.solution },
          ] as const
        ).map(({ key, value }) => (
          <div key={key} className="card p-6">
            <dt className="text-micro uppercase tracking-wider text-ink-muted">
              {t(`detail.${key}`)}
            </dt>
            <dd className="mt-3 text-body text-ink">
              {value ? localize(value, locale) : t("pending")}
            </dd>
          </div>
        ))}
      </dl>

      {company.catalog && company.catalog.length > 0 && (
        <section className="card mt-6 p-6">
          <h2 className="text-micro uppercase tracking-wider text-ink-muted">
            {t("detail.catalog")}
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {company.catalog.map((item) => {
              const name = localize(item.name, locale);
              return (
                <div
                  key={name}
                  className="flex flex-col gap-3 rounded-md border border-line bg-surface p-4"
                >
                  {item.image && (
                    <div
                      className="bg-elevated overflow-hidden rounded-sm border border-line"
                      style={{ aspectRatio: "1" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <dt className="text-body font-semibold text-ink">{name}</dt>
                    {item.description && (
                      <dd className="mt-1 text-small text-ink-secondary">
                        {localize(item.description, locale)}
                      </dd>
                    )}
                  </div>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      <section className="card mt-6 p-6">
        <h2 className="text-micro uppercase tracking-wider text-ink-muted">
          {t("detail.contact")}
        </h2>
        {person && (
          <p className="mt-4 text-h4 font-display text-ink">{person}</p>
        )}
        {hasLinks ? (
          <dl className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-4">
            {contactEntries.map(({ key, value, href, external }) =>
              value ? (
                <div key={key} className="flex flex-col gap-0.5">
                  <dt className="text-small text-ink-muted">{t(`detail.${key}`)}</dt>
                  <dd>
                    <a
                      href={href}
                      className="text-link underline underline-offset-4"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              ) : null,
            )}
          </dl>
        ) : (
          <p className="mt-4 text-small text-ink-muted">{t("pending")}</p>
        )}
      </section>
    </article>
  );
}

export default async function CompanyDetailPage({
  params,
}: PageProps<"/[locale]/empresas/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const company = getCompany(slug);
  if (!company) notFound();

  return <CompanyDetail company={company} locale={locale} />;
}
