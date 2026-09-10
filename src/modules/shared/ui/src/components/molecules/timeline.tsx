interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
}

export function Timeline({ items }: { items: TimelineItemProps[] }) {
  return (
    <ol className="relative border-l-2 border-line pl-8">
      {items.map((item, i) => (
        <li key={i} className="pb-12 last:pb-0">
          <span
            className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border-[3px] border-brand bg-surface"
            aria-hidden="true"
          />
          <p className="text-micro uppercase tracking-wider text-ink-muted">{item.date}</p>
          <h3 className="text-h4 mt-1 font-display text-ink">{item.title}</h3>
          {item.description && (
            <p className="mt-2 max-w-xl text-body text-ink-secondary">{item.description}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
