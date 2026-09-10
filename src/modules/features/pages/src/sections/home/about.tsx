import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ArrowRight } from "lucide-react";
import { ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";

interface AboutProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkLabel: string;
}

export function About({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  linkLabel,
}: AboutProps) {
  return (
    <section className="bg-surface">
      <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link
            href="/quienes-somos"
            className="mt-6 inline-flex items-center gap-2 text-body font-medium text-link"
          >
            {linkLabel}
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ImageFrame src={imageSrc} alt={imageAlt} ratio="4 / 3" />
      </div>
    </section>
  );
}
