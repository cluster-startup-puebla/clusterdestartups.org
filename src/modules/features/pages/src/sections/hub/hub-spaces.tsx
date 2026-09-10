import { SectionHeader, FeatureCard } from "@/modules/shared/ui/src/components";

interface HubSpacesProps {
  eyebrow: string;
  title: string;
  description: string;
  spaces: {
    title: string;
    description: string;
    image: { src: string; alt: string };
    icon: React.ReactNode;
  }[];
}

export function HubSpaces({ eyebrow, title, description, spaces }: HubSpacesProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {spaces.map((space) => (
            <FeatureCard
              key={space.title}
              title={space.title}
              description={space.description}
              image={space.image}
              icon={space.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
