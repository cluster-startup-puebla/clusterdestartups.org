import { ShieldCheck } from "lucide-react";

interface TransparencyNoticeProps {
  title: string;
  text: string;
}

export function TransparencyNotice({ title, text }: TransparencyNoticeProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="mx-auto flex max-w-3xl gap-4 rounded-md border border-line p-6">
          <ShieldCheck size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h2 className="text-body font-medium text-ink">{title}</h2>
            <p className="mt-1 text-small text-ink-muted">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
