import { ProfileCard, SectionHeader } from "@/modules/shared/ui/src/components";

interface HonorarySectionProps {
  eyebrow: string;
  title: string;
  description: string;
  member: {
    name: string;
    role: string;
    image: { src: string; alt: string };
  };
}

export function HonorarySection({ eyebrow, title, description, member }: HonorarySectionProps) {
  return (
    <section className="bg-surface py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileCard
            name={member.name}
            role={member.role}
            image={member.image}
          />
        </div>
      </div>
    </section>
  );
}
