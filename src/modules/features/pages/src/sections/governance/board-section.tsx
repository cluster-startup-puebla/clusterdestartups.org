import { ProfileCard, SectionHeader } from "@/modules/shared/ui/src/components";

interface BoardMember {
  name: string;
  role: string;
  description: string;
  image?: { src: string; alt: string };
  badge?: string;
}

interface BoardSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  featured: BoardMember;
  members: BoardMember[];
}

export function BoardSection({
  eyebrow,
  title,
  description,
  featured,
  members,
}: BoardSectionProps) {
  return (
    <section className="bg-surface py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12 flex flex-col items-center gap-12">
          <div className="w-full max-w-sm">
            <ProfileCard
              name={featured.name}
              role={featured.role}
              description={featured.description}
              image={featured.image}
              badge={featured.badge}
            />
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <ProfileCard
                key={member.name}
                name={member.name}
                role={member.role}
                description={member.description}
                image={member.image}
                badge={member.badge}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
