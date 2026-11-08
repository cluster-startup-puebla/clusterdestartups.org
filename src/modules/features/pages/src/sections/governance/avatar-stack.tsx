import { FounderAvatar } from "@/modules/features/founders/src";
import type { CommitteeMember } from "@/data/committees";

export function AvatarStack({ people }: { people: readonly CommitteeMember[] }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden="true">
      {people.map((person, index) => (
        <FounderAvatar
          key={person.name}
          name={person.name}
          photo={person.photo}
          className={`size-14 text-small ring-2 ring-surface ${person.photoClassName ?? "object-center"} ${index > 0 ? "-ml-3" : ""}`}
        />
      ))}
    </span>
  );
}
