import { Link } from "@/modules/cores/i18n/src/config/routing";

interface CtaGroupProps {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  onDark?: boolean;
  align?: "left" | "center";
}

export function CtaGroup({ primary, secondary, onDark = false, align = "left" }: CtaGroupProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`}>
      <Link href={primary.href} className={onDark ? "btn btn-on-dark" : "btn btn-primary"}>
        {primary.label}
      </Link>
      {secondary && (
        <Link
          href={secondary.href}
          className={onDark ? "btn btn-secondary text-on-brand" : "btn btn-secondary"}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
