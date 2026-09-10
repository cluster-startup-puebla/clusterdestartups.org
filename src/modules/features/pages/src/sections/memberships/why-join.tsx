import type { LucideIcon } from "lucide-react";
import { DoorOpen, Megaphone, Network } from "lucide-react";
import { FeatureCard, SectionHeader } from "@/modules/shared/ui/src/components";

interface WhyJoinItem {
  title: string;
  description: string;
}

interface WhyJoinProps {
  eyebrow: string;
  title: string;
  description: string;
  items: WhyJoinItem[];
}

const ICONS: LucideIcon[] = [DoorOpen, Network, Megaphone];

export function WhyJoin({ eyebrow, title, description, items }: WhyJoinProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <FeatureCard
                key={item.title}
                icon={<Icon strokeWidth={1.5} size={28} aria-hidden="true" />}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
