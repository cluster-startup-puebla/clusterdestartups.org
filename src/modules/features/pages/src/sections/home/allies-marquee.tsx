interface AllyLogo {
  src: string;
  alt: string;
  /** Height utilities. The default matches a square or crest. Wordmarks override it so the cap height matches. */
  frame?: string;
}

interface AllyCluster {
  logos: AllyLogo[];
}

type AllyItem = AllyLogo | AllyCluster;

interface AlliesMarqueeProps {
  label: string;
  logos: AllyItem[];
}

const COPIES = 4;
const DEFAULT_FRAME = "h-12 w-auto sm:h-14";

function isCluster(item: AllyItem): item is AllyCluster {
  return "logos" in item;
}

function AllyImage({ logo, hidden }: { logo: AllyLogo; hidden: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={hidden ? "" : logo.alt}
      className={`object-contain ${logo.frame ?? DEFAULT_FRAME}`}
    />
  );
}

function AllyGroup({ logos, copy }: { logos: AllyItem[]; copy: number }) {
  const hidden = copy > 0;

  return (
    <ul aria-hidden={hidden || undefined} className="allies-group">
      {logos.map((item) =>
        isCluster(item) ? (
          <li key={item.logos.map((logo) => logo.src).join("|")} className="allies-cluster shrink-0">
            {item.logos.map((logo) => (
              <AllyImage key={logo.src} logo={logo} hidden={hidden} />
            ))}
          </li>
        ) : (
          <li key={item.src} className="flex shrink-0 items-center">
            <AllyImage logo={item} hidden={hidden} />
          </li>
        ),
      )}
    </ul>
  );
}

export function AlliesMarquee({ label, logos }: AlliesMarqueeProps) {
  return (
    <section aria-label={label} className="allies-band overflow-hidden py-8">
      <p className="text-center text-micro uppercase tracking-wider text-navy/60">{label}</p>
      <div className="allies-marquee mt-5">
        <div className="allies-track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <AllyGroup key={copy} logos={logos} copy={copy} />
          ))}
        </div>
      </div>
    </section>
  );
}
