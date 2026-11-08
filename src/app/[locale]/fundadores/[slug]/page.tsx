import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { Badge, CompanyLogo, VerifiedMark } from "@/modules/shared/ui/src/components";
import { getCompany, localize, STARTUP_INDUSTRIES } from "@/data/companies";
import {
  founderCompany,
  founders,
  getFounder,
  type Founder,
  type FounderPlace,
} from "@/data/founders";
import { FounderAvatar, FounderPhoto } from "@/modules/features/founders/src";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    founders.map((founder) => ({ locale, slug: founder.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const founder = getFounder(slug);
  if (!founder) return {};
  const company = founderCompany(founder);

  return buildMetadata({
    locale,
    route: `/fundadores/${slug}`,
    title: founder.name,
    description: founder.bio
      ? localize(founder.bio, locale)
      : `${founder.name}${company ? ` · ${company.name}` : ""}`,
    images: founder.photo ? [{ url: founder.photo, alt: founder.name }] : undefined,
  });
}

function CompanyRefRow({ slugs }: { slugs: readonly string[] }) {
  const listed = slugs
    .map((slug) => getCompany(slug))
    .filter((company) => company !== undefined);

  if (listed.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-10">
      {listed.map((company) => (
        <li key={company.slug}>
          <Link
            href={`/empresas/${company.slug}`}
            className="group flex w-36 flex-col items-center gap-3 text-center"
          >
            <CompanyLogo
              name={company.name}
              logo={company.logo}
              className="h-12 w-36"
              dark={company.logoDark}
              ink={company.logoInk}
            />
            <span className="inline-flex items-center gap-1 text-small leading-snug text-ink-secondary">
              <span className="group-hover:text-brand">{company.name}</span>{" "}
              <VerifiedMark verified={company.verified} className="inline-block size-3.5 align-[-0.15em]" />
              <ChevronRight size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 group-hover:text-brand" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PlaceRow({ places }: { places: readonly FounderPlace[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-10">
      {places.map((place) => (
        <li key={place.name} className="flex w-32 flex-col items-center gap-3 text-center">
          <span className="flex size-16 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
            {place.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={place.logo} alt="" className="size-full object-cover" />
            ) : (
              <span className="font-display text-body text-ink">{place.name.slice(0, 1)}</span>
            )}
          </span>
          <span className="text-small leading-snug text-ink-secondary">{place.name}</span>
        </li>
      ))}
    </ul>
  );
}

async function FounderProfile({ founder, locale }: { founder: Founder; locale: string }) {
  const t = await getTranslations({ locale, namespace: "Founders" });
  const company = founderCompany(founder);
  const industries = (company?.industries ?? []).map((id) =>
    localize(STARTUP_INDUSTRIES[id], locale),
  );
  const region = company?.region ? localize(company.region, locale) : undefined;
  const description = company?.shortDescription
    ? localize(company.shortDescription, locale)
    : undefined;
  const related = founders.filter(
    (item) => item.slug !== founder.slug && item.companySlug === founder.companySlug,
  );

  return (
    <article className="container-site py-16 lg:py-24">
      <nav aria-label={t("backToList")}>
        <ol className="flex flex-wrap items-center gap-2 text-small text-ink-muted">
          <li>
            <Link href="/" className="text-link">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/fundadores" className="text-link">
              {t("backToList")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{founder.name}</li>
        </ol>
      </nav>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <header className="card overflow-hidden">
            <div className="relative h-36 overflow-hidden rounded-t-md bg-surface-subtle sm:h-44">
              {(company?.logoMark ?? company?.logo) && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid grid-cols-4 place-items-center gap-6 p-6 opacity-40 sm:grid-cols-6 dark:opacity-55"
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={index}
                      src={company.logoMark ?? company.logo}
                      alt=""
                      className="max-h-10 w-full object-contain brightness-0 dark:invert"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 pb-8 sm:px-8">
              <div className="relative z-10 -mt-14 flex flex-col gap-4 sm:flex-row sm:items-end">
                <FounderPhoto
                  name={founder.name}
                  photo={founder.photo}
                  openLabel={t("viewPhoto", { name: founder.name })}
                  closeLabel={t("closePhoto")}
                />
                <div className="pb-1">
                  <h1 className="text-h1 font-display text-ink">
                    {founder.name}{" "}
                    <VerifiedMark verified={founder.verified} className="inline-block size-6 align-[-0.15em]" />
                  </h1>
                  {company && founder.role && (
                    <p className="mt-1 text-body text-ink-secondary">
                      {t("roleAt", { role: founder.role, company: company.name })}
                    </p>
                  )}
                </div>
              </div>
              {founder.bio && (
                <p className="mt-6 max-w-2xl text-body leading-relaxed text-ink">
                  {localize(founder.bio, locale)}
                </p>
              )}

              {founder.linkedin && (
                <section className="mt-10 border-t border-line pt-8">
                  <h2 className="text-h4 font-display text-ink">
                    {t("follow", { name: founder.name.split(" ")[0] })}
                  </h2>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full max-w-xs items-center gap-3 rounded-md border border-line px-4 py-3 transition hover:bg-surface-subtle"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/linkedin.svg" alt="" className="size-10 shrink-0" />
                    <span>
                      <span className="block text-body font-semibold text-ink">LinkedIn</span>
                      <span className="block text-small text-ink-muted">{t("linkedinHint")}</span>
                    </span>
                  </a>
                </section>
              )}

              {founder.alsoAt && founder.alsoAt.length > 0 && (
                <section className="mt-10 border-t border-line pt-8">
                  <h2 className="text-h4 font-display text-ink">{t("alsoAt")}</h2>
                  <CompanyRefRow
                    slugs={founder.alsoAt
                      .map((place) => place.companySlug)
                      .filter((slug) => slug !== founder.companySlug)}
                  />
                </section>
              )}

              {founder.previouslyAt && founder.previouslyAt.length > 0 && (
                <section className="mt-10 border-t border-line pt-8">
                  <h2 className="text-h4 font-display text-ink">{t("previously")}</h2>
                  <PlaceRow places={founder.previouslyAt} />
                </section>
              )}

              {founder.alumnusOf && founder.alumnusOf.length > 0 && (
                <section className="mt-10 border-t border-line pt-8">
                  <h2 className="text-h4 font-display text-ink">{t("education")}</h2>
                  <PlaceRow places={founder.alumnusOf} />
                </section>
              )}
            </div>
          </header>
        </div>

        <aside className="grid gap-6">
          {company && (
            <section className="card p-6">
              <p className="text-micro uppercase tracking-wider text-ink-muted">{t("company")}</p>
              <div className="mt-4 flex items-center gap-4">
                <CompanyLogo
                  name={company.name}
                  logo={company.logo}
                  className="size-14"
                  dark={company.logoDark}
                  ink={company.logoInk}
                />
                <h2 className="text-h4 font-display text-ink">
                  {company.name}{" "}
                  <VerifiedMark verified={company.verified} className="inline-block size-4 align-[-0.15em]" />
                </h2>
              </div>
              {description && (
                <p className="mt-4 text-small text-ink-secondary">{description}</p>
              )}
              {industries.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <li key={industry}>
                      <Badge>{industry}</Badge>
                    </li>
                  ))}
                </ul>
              )}
              <dl className="mt-5 grid gap-3 text-small">
                {region && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{t("filter.region")}</dt>
                    <dd className="text-right text-ink">{region}</dd>
                  </div>
                )}
              </dl>
              <Link href={`/empresas/${company.slug}`} className="mt-5 inline-flex items-center gap-1 text-small text-link">
                {t("viewCompany")}
                <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </section>
          )}

          {related.length > 0 && (
            <section className="card p-6">
              <h2 className="text-h4 font-display text-ink">
                {t("related", { company: company?.name ?? "" })}
              </h2>
              <ul className="mt-4 grid gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/fundadores/${item.slug}`} className="group flex items-center gap-3 rounded-md py-1">
                      <FounderAvatar name={item.name} photo={item.photo} className="size-10 text-micro" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-small leading-snug text-ink">
                          <span className="group-hover:text-brand">{item.name}</span>{" "}
                          <VerifiedMark verified={item.verified} className="inline-block size-3.5 align-[-0.15em]" />
                        </span>
                        {item.role && (
                          <span className="block text-micro text-ink-muted">{item.role}</span>
                        )}
                      </span>
                      <ChevronRight size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-ink-muted transition group-hover:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </article>
  );
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const founder = getFounder(slug);
  if (!founder) notFound();
  return <FounderProfile founder={founder} locale={locale} />;
}
