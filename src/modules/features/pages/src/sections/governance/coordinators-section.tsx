import { ProfileCard, SectionHeader } from "@/modules/shared/ui/src/components";

interface CoordinatorMember {
  name: string;
  role: string;
  description: string;
  badge: string;
  image: { src: string; alt: string };
}

interface CoordinatorsSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  members: CoordinatorMember[];
}

export function CoordinatorsSection({
  eyebrow,
  title,
  description,
  members,
}: CoordinatorsSectionProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <ProfileCard
              key={member.name}
              name={member.name}
              role={member.role}
              description={member.description}
              badge={member.badge}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
