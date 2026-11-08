import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { type Committee, type CommitteeMember, committeePeople, committees } from "@/data/committees";
import { CommitteeMemberRow } from "./committee-member-row";
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

export async function CommitteeDetail({
  locale,
  committee,
}: {
  locale: string;
  committee: Committee;
}) {
  const tRaw = await getTranslations({ locale, namespace: "Governance" });
  const t = (key: string) => tRaw(key as never);
  const people = committeePeople(committee);
  const others = committees.filter((item) => item.slug !== committee.slug);

  return (
    <article>
      <header className="bg-surface py-16 lg:py-32">
        <div className="container-site">
          <nav aria-label={t("indexLabel")}>
            <ol className="flex flex-wrap items-center gap-2 text-small text-ink-muted">
              <li>
                <Link href="/gobernanza" className="text-link">
                  {t("indexLabel")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{t(committee.titleKey)}</li>
            </ol>
          </nav>
          {committee.kind === "board" ? (
            <p className="mt-10 text-small text-ink-muted">{t("period")}</p>
          ) : (
            <p className="mt-10 text-small text-ink-muted">{t("heroEyebrow")}</p>
          )}
          <h1 className="mt-4 max-w-4xl text-h1 font-display text-ink lg:text-display">
            {t(committee.titleKey)}
          </h1>
        </div>
      </header>

      <section className="border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-small text-ink-muted">{t("whatLabel")}</p>
            <p className="mt-4 max-w-xl text-body-lg text-ink">{t(committee.whatKey)}</p>
          </div>
          <div>
            <p className="text-small text-ink-muted">{t("purposeLabel")}</p>
            <p className="mt-4 max-w-xl text-body-lg text-ink-secondary">{t(committee.purposeKey)}</p>
          </div>
        </div>
      </section>

      {committee.lead ? (
        <section className="bg-surface-subtle py-16 lg:py-24">
          <div className="container-site">
            <h2 className="text-center text-h3 font-display text-ink">{t("membersLabel")}</h2>
            <div className="mt-12">
              <OrgChart
                lead={orgPerson(committee.lead, t)}
                people={committee.members.map((member) => orgPerson(member, t))}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className={committee.lead ? "bg-surface py-16 lg:py-24" : "bg-surface-subtle py-16 lg:py-24"}>
        <div className="container-site">
          {committee.lead ? (
            <h2 className="text-h3 font-display text-ink">{t("rolesLabel")}</h2>
          ) : (
            <h2 className="text-h3 font-display text-ink">{t("membersLabel")}</h2>
          )}
          <ul className="mt-4 max-w-3xl divide-y divide-line">
            {people.map((member) => (
              <li key={member.name}>
                <CommitteeMemberRow
                  member={member}
                  role={t(member.roleKey)}
                  description={member.descriptionKey ? t(member.descriptionKey) : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="border-t border-line bg-surface py-16 lg:py-24" aria-label={t("otherLabel")}>
        <div className="container-site">
          <p className="text-small text-ink-muted">{t("otherLabel")}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/gobernanza/${item.slug}`} className="text-h4 font-display text-ink hover:text-brand">
                  {t(item.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </article>
  );
}
