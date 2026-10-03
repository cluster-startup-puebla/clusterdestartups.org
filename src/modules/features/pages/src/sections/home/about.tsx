import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/modules/shared/ui/src/components";
import { TripleHelixDiagram } from "./triple-helix-diagram";

interface AboutProps {
  eyebrow: string;
  title: string;
  description: string;
  diagramLabel: string;
  government: string;
  academia: string;
  industry: string;
  linkLabel: string;
}

export function About({
  eyebrow,
  title,
  description,
  diagramLabel,
  government,
  academia,
  industry,
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
        <div className="overflow-hidden rounded-md border border-line bg-elevated px-4 py-6 sm:px-6">
          <TripleHelixDiagram
            label={diagramLabel}
            government={government}
            academia={academia}
            industry={industry}
          />
        </div>
      </div>
    </section>
  );
}
