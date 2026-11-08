import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { type CommitteeMember, committeePeople, committees } from "@/data/committees";
import { AvatarStack } from "./avatar-stack";
import { OrgChart } from "./org-chart";

function orgPerson(member: CommitteeMember, t: (key: string) => string) {
  return {
    name: member.name,
    role: t(member.roleKey),
    photo: member.photo,
    href: member.href,
    photoClassName: member.photoClassName,
  };
}

export async function GovernanceIndex({ locale }: { locale: string }) {
  const tRaw = await getTranslations({ locale, namespace: "Governance" });
  const t = (key: string) => tRaw(key as never);
  const board = committees[0];
  const rest = committees.slice(1);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-surface py-16 lg:py-32">
        <div className="container-site">
          <p className="text-small text-ink-muted">
            {t("heroEyebrow")} · {t("period")}
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-display text-ink lg:text-display">{t("heroTitle")}</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-secondary">{t("heroDescription")}</p>
        </div>
      </section>

      <section className="bg-surface-subtle py-16 lg:py-32">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-display text-ink">{t(board.titleKey)}</h2>
            <p className="mt-4 text-body text-ink-secondary">{t(board.whatKey)}</p>
            <Link href={`/gobernanza/${board.slug}`} className="btn btn-secondary mt-8">
              {t(board.ctaKey)}
            </Link>
          </div>
          <div className="lg:col-span-8">
            <OrgChart
              lead={board.lead ? orgPerson(board.lead, t) : undefined}
              people={board.members.map((member) => orgPerson(member, t))}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-site">
          <h2 className="pt-16 text-h2 font-display text-ink lg:pt-24">{t("organsTitle")}</h2>
          <p className="mt-3 max-w-2xl text-body text-ink-secondary">{t("organsDescription")}</p>
        </div>
        <ul className="mt-10">
          {rest.map((committee) => {
            const people = committeePeople(committee);
            return (
              <li key={committee.slug} className="border-t border-line">
                <Link
                  href={`/gobernanza/${committee.slug}`}
                  className="group block"
                >
                  <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between lg:py-12">
                    <div className="flex min-w-0 items-start gap-5 sm:items-center">
                      <AvatarStack people={people} />
                      <div className="min-w-0">
                        <h3 className="text-h3 font-display text-ink group-hover:text-brand">
                          {t(committee.titleKey)}
                        </h3>
                        <p className="mt-2 max-w-xl text-body text-ink-secondary">{t(committee.whatKey)}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-small text-link">{t(committee.ctaKey)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-site">
          <blockquote className="max-w-3xl">
            <p className="text-small text-ink-muted">{t("transparencyTitle")}</p>
            <p className="mt-4 text-body-lg text-ink">{t("transparencyText")}</p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
