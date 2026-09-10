interface StepsProps {
  steps: { title: string; description?: string }[];
}

export function Steps({ steps }: StepsProps) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={i} className="card flex gap-4 p-6">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-micro font-bold text-on-brand"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="text-h4 font-display text-ink">{step.title}</h3>
            {step.description && (
              <p className="mt-1 text-small text-ink-secondary">{step.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
