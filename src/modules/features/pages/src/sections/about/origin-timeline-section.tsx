import { ImageFrame, SectionHeader, Timeline } from "@/modules/shared/ui/src/components";

interface OriginTimelineItem {
  date: string;
  title: string;
  description: string;
}

interface OriginTimelineSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  items: OriginTimelineItem[];
  image: { src: string; alt: string; ratio?: string };
}

export function OriginTimelineSection({
  eyebrow,
  title,
  description,
  items,
  image,
}: OriginTimelineSectionProps) {
  return (
    <section className="bg-surface py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Timeline items={items} />
          <div>
            <ImageFrame src={image.src} alt={image.alt} ratio={image.ratio} />
          </div>
        </div>
      </div>
    </section>
  );
}
