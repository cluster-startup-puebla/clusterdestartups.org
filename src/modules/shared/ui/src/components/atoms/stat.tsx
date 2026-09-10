interface StatProps {
  value: string;
  label: string;
  note?: string;
}

export function Stat({ value, label, note }: StatProps) {
  return (
    <div className="card p-6">
      <p className="text-h1 font-display text-brand">{value}</p>
      <p className="mt-2 text-body font-medium text-ink">{label}</p>
      {note && <p className="mt-1 text-small text-ink-muted">{note}</p>}
    </div>
  );
}
