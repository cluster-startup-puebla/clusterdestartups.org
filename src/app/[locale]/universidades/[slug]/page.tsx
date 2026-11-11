import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { CompanyLogo, VerifiedMark } from "@/modules/shared/ui/src/components";
import { localize, type Company } from "@/data/companies";
import { founderCompany, founderRoleAt, type Founder } from "@/data/founders";
import { FounderAvatar } from "@/modules/features/founders/src";
import {
  getCompaniesByUniversity,
  getFoundersByUniversity,
  getIncubatedCompanies,
  getUniversity,
  universities,
  type University,
} from "@/data/universities";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    universities.map((university) => ({ locale, slug: university.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const university = getUniversity(slug);
  if (!university) return {};

  return buildMetadata({
    locale,
    route: `/universidades/${university.slug}`,
    title: university.name,
    description: localize(university.summary, locale),
    images: university.logo ? [{ url: university.logo, alt: university.name }] : undefined,
  });
}

function CompanyCell({ company }: { company: Company }) {
  return (
    <li className="min-w-0">
      <Link href={`/empresas/${company.slug}`} className="group flex h-full flex-col items-center gap-2 rounded-md px-2 py-3 text-center">
        <CompanyLogo
          name={company.name}
          logo={company.logo}
          className="h-10 w-full"
          dark={company.logoDark}
          ink={company.logoInk}
        />
        <span className="inline-flex max-w-full items-center justify-center gap-1 text-small leading-snug text-ink">
          <span className="truncate group-hover:text-brand">{company.name}</span>
          <VerifiedMark verified={company.verified} className="size-3.5 shrink-0" />
        </span>
      </Link>
    </li>
  );
}

function campusAt(founder: Founder, universitySlug: string, locale: string) {
  const campus = founder.alumnusOf?.find((place) => place.universitySlug === universitySlug)?.campus;
  return campus ? localize(campus, locale) : undefined;
}

async function UniversityProfile({
  university,
  locale,
}: {
  university: University;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "Universities" });
  const people = getFoundersByUniversity(university.slug);
  const startups = getCompaniesByUniversity(university.slug);
  const incubated = getIncubatedCompanies(university.slug);

  return (
    <article className="container-site py-16 lg:py-24">
      <nav aria-label={university.shortName}>
        <ol className="flex flex-wrap items-center gap-2 text-small text-ink-muted">
          <li>
            <Link href="/" className="text-link">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/universidades" className="text-link">
              {t("index")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{university.shortName}</li>
        </ol>
      </nav>

      <header className="card mt-8 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-elevated sm:size-20">
            {university.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={university.logo} alt="" className="size-full object-contain" />
            ) : (
              <span className="font-display text-h3 text-ink">{university.shortName.slice(0, 1)}</span>
            )}
          </span>
          <div className="min-w-0">
            <h1 className="text-h3 font-display text-ink sm:text-h1">{university.shortName}</h1>
            {university.name !== university.shortName && (
              <p className="mt-1 text-body text-balance text-ink">{university.name}</p>
            )}
            <p className="mt-2 text-body text-ink-secondary">{localize(university.summary, locale)}</p>
          </div>
        </div>
      </header>

      <section className="card mt-6 p-6">
        <h2 className="text-h4 font-display text-ink">{t("startups")}</h2>
        {startups.length === 0 ? (
          <p className="mt-4 text-small text-ink-secondary">{t("emptyStartups")}</p>
        ) : (
          <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2 xl:grid-cols-5">
            {startups.map((company) => (
              <CompanyCell key={company.slug} company={company} />
            ))}
          </ul>
        )}
      </section>

      {incubated.length > 0 && (
        <section className="card mt-6 p-6">
          <h2 className="text-h4 font-display text-ink">{t("incubated")}</h2>
          <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2 xl:grid-cols-5">
            {incubated.map((company) => (
              <CompanyCell key={company.slug} company={company} />
            ))}
          </ul>
        </section>
      )}

      <section className="card mt-6 p-6">
        <h2 className="text-h4 font-display text-ink">{t("founders")}</h2>
        {people.length === 0 ? (
          <p className="mt-4 text-small text-ink-secondary">{t("emptyFounders")}</p>
        ) : (
          <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {people.map((founder) => {
              const company = founderCompany(founder);
              const role = company ? founderRoleAt(founder, company.slug) : founder.role;
              const campus = campusAt(founder, university.slug, locale);
              return (
                <li key={founder.slug} className="min-w-0">
                  <Link href={`/fundadores/${founder.slug}`} className="group flex h-full items-center gap-3 rounded-md py-1">
                    <FounderAvatar name={founder.name} photo={founder.photo} className="size-12 shrink-0 text-small" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1">
                        <span className="truncate text-small font-display leading-snug text-ink group-hover:text-brand">
                          {founder.name}
                        </span>
                        <VerifiedMark verified={founder.verified} className="size-3.5 shrink-0" />
                      </span>
                      <span className="mt-0.5 block truncate text-micro leading-snug text-ink-secondary">
                        {role && company ? `${role} · ${company.name}` : "\u00a0"}
                      </span>
                      <span className="block truncate text-micro leading-snug text-ink-muted">{campus || "\u00a0"}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </article>
  );
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const university = getUniversity(slug);
  if (!university) notFound();
  return <UniversityProfile university={university} locale={locale} />;
}
