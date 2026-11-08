import { OrgNode } from "./org-node";

interface Person {
  name: string;
  role: string;
  photo?: string;
  href?: string;
  photoClassName?: string;
}

interface OrgChartProps {
  lead?: Person;
  people: Person[];
}

export function OrgChart({ lead, people }: OrgChartProps) {
  const cols = people.length === 2 ? "2" : people.length >= 3 ? "3" : "1";

  return (
    <div className="org-chart">
      {lead ? (
        <>
          <OrgNode {...lead} featured />
          {people.length > 0 ? <span className="org-chart-stem" aria-hidden="true" /> : null}
        </>
      ) : null}
      {people.length > 0 ? (
        <ul className="org-chart-row" data-cols={cols}>
          {people.map((person) => (
            <li key={person.name} className="org-chart-cell">
              {lead ? <span className="org-chart-stem" aria-hidden="true" /> : null}
              <OrgNode {...person} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
