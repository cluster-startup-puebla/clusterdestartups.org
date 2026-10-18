import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ProfileCard, SectionHeader } from "@/modules/shared/ui/src/components";
import { CopyButton } from "./copy-button";

const SWATCH: Record<string, string> = {
  "logo-magenta": "bg-logo-magenta",
  "logo-ink": "bg-logo-ink",
  brand: "bg-brand",
  navy: "bg-navy",
  "on-brand": "border border-line bg-on-brand",
};

interface CopyLabels {
  copyLabel: string;
  copiedLabel: string;
}

interface NamingItem {
  label: string;
  text: string;
}

interface FactItem {
  label: string;
  value: string;
}

interface LogoItem {
  name: string;
  use: string;
  preview: string;
  svg: string;
  png: string;
  surface: "light" | "dark";
}

interface ColorItem {
  name: string;
  hex: string;
  swatch: string;
  note: string;
}

interface TypeItem {
  name: string;
  role: string;
}

interface PersonItem {
  name: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface PageLink {
  label: string;
  href: string;
}

export interface MediaKitProps extends CopyLabels {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  downloadLabel: string;
  downloadHref: string;
  contactLabel: string;
  contactEmail: string;
  naming: { eyebrow: string; title: string; description: string; items: NamingItem[] };
  facts: { eyebrow: string; title: string; description: string; items: FactItem[] };
  logos: {
    eyebrow: string;
    title: string;
    description: string;
    svgLabel: string;
    pngLabel: string;
    items: LogoItem[];
  };
  rules: { eyebrow: string; title: string; items: string[] };
  brand: {
    eyebrow: string;
    title: string;
    description: string;
    colorsLabel: string;
    typeLabel: string;
    typeNote: string;
    colors: ColorItem[];
    types: TypeItem[];
  };
  people: {
    eyebrow: string;
    title: string;
    description: string;
    teamLabel: string;
    items: PersonItem[];
  };
  links: { eyebrow: string; title: string; items: PageLink[] };
  license: { title: string; text: string };
}

function FactValue({ value }: { value: string }) {
  if (value.startsWith("mailto:") || value.includes("@") && !value.startsWith("http")) {
    const email = value.replace(/^mailto:/, "");
    return (
      <a href={`mailto:${email}`} className="text-link">
        {email}
      </a>
    );
  }
  if (value.startsWith("http")) {
    return (
      <a href={value} className="text-link break-all" target="_blank" rel="noopener noreferrer">
        {value.replace(/^https:\/\//, "")}
      </a>
    );
  }
  return <span className="text-body text-ink">{value}</span>;
}

export function MediaKit(props: MediaKitProps) {
  const { copyLabel, copiedLabel } = props;

  return (
    <>
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            as="h1"
            eyebrow={props.heroEyebrow}
            title={props.heroTitle}
            description={props.heroDescription}
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={props.downloadHref} download className="btn btn-primary">
              {props.downloadLabel}
            </a>
            <a href={`mailto:${props.contactEmail}`} className="btn btn-secondary">
              {props.contactLabel}
            </a>
          </div>
        </div>
      </section>

      <section id="nombrarnos" className="bg-surface-subtle py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={props.naming.eyebrow}
            title={props.naming.title}
            description={props.naming.description}
          />
          <div className="mt-12 grid gap-6">
            {props.naming.items.map((item) => (
              <article key={item.label} className="card p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-h4 font-display text-ink">{item.label}</h3>
                  <CopyButton text={item.text} label={copyLabel} copiedLabel={copiedLabel} />
                </div>
                <p className="mt-4 max-w-3xl text-body text-ink-secondary">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ficha" className="bg-surface py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={props.facts.eyebrow}
            title={props.facts.title}
            description={props.facts.description}
          />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {props.facts.items.map((item) => (
              <div key={item.label} className="card p-6">
                <dt className="text-micro uppercase tracking-wider text-ink-muted">{item.label}</dt>
                <dd className="mt-2 text-body text-ink">
                  <FactValue value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="logotipos" className="bg-surface-subtle py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={props.logos.eyebrow}
            title={props.logos.title}
            description={props.logos.description}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {props.logos.items.map((item) => (
              <article key={item.name} className="card flex flex-col overflow-hidden">
                <div
                  className={`flex items-center justify-center border-b border-line p-8 ${
                    item.surface === "dark" ? "bg-navy" : "bg-on-brand"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt={item.name}
                    width={972}
                    height={400}
                    className="h-auto w-full max-w-sm"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-h4 font-display text-ink">{item.name}</h3>
                    <p className="mt-2 text-small text-ink-secondary">{item.use}</p>
                  </div>
                  <div className="mt-auto flex gap-4">
                    <a href={item.svg} download className="text-small font-semibold text-link">
                      {props.logos.svgLabel}
                    </a>
                    <a href={item.png} download className="text-small font-semibold text-link">
                      {props.logos.pngLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <SectionHeader eyebrow={props.rules.eyebrow} title={props.rules.title} />
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {props.rules.items.map((rule) => (
                <li key={rule} className="card p-6 text-body text-ink-secondary">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="marca" className="bg-surface py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={props.brand.eyebrow}
            title={props.brand.title}
            description={props.brand.description}
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 font-display text-ink">{props.brand.colorsLabel}</h3>
              <ul className="mt-6 space-y-4">
                {props.brand.colors.map((color) => (
                  <li key={color.hex} className="card flex items-center gap-4 p-4">
                    <span
                      className={`h-12 w-12 shrink-0 rounded-md ${SWATCH[color.swatch] ?? "bg-elevated"}`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-small font-semibold text-ink">{color.name}</p>
                      <p className="text-small text-ink-secondary">{color.note}</p>
                    </div>
                    <CopyButton text={color.hex} label={color.hex} copiedLabel={copiedLabel} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-h3 font-display text-ink">{props.brand.typeLabel}</h3>
              <ul className="mt-6 space-y-4">
                {props.brand.types.map((type) => (
                  <li key={type.name} className="card p-6">
                    <p className="text-h3 font-display text-ink">{type.name}</p>
                    <p className="mt-1 text-small text-ink-secondary">{type.role}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-body text-ink-secondary">{props.brand.typeNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="voceros" className="bg-surface-subtle py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={props.people.eyebrow}
            title={props.people.title}
            description={props.people.description}
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
            {props.people.items.map((person) => (
              <ProfileCard
                key={person.name}
                name={person.name}
                role={person.role}
                description={person.description}
                image={{ src: person.image, alt: person.imageAlt }}
              />
            ))}
          </div>
          <Link href="/gobernanza" className="btn btn-secondary mt-8">
            {props.people.teamLabel}
          </Link>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader eyebrow={props.links.eyebrow} title={props.links.title} />
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {props.links.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="card mt-12 max-w-3xl p-8">
            <h2 className="text-h3 font-display text-ink">{props.license.title}</h2>
            <p className="mt-4 text-body text-ink-secondary">{props.license.text}</p>
          </div>
        </div>
      </section>
    </>
  );
}
