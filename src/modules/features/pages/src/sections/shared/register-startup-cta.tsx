import { Button } from "@/modules/shared/ui/src/components";

interface RegisterStartupCtaProps {
  title: string;
  description: string;
  label: string;
}

export function RegisterStartupCta({ title, description, label }: RegisterStartupCtaProps) {
  return (
    <section className="bg-surface-subtle">
      <div className="container-site flex flex-col gap-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h3 font-display text-ink">{title}</h2>
          <p className="mt-3 text-body text-ink-secondary">{description}</p>
        </div>
        <Button href="/contacto">{label}</Button>
      </div>
    </section>
  );
}
