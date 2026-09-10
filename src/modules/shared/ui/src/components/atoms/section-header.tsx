interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
      )}
      <Tag className={`text-ink ${Tag === "h1" ? "text-h1" : "text-h2"} mt-3 font-display`}>
        {title}
      </Tag>
      {description && (
        <p className={`text-body-lg text-ink-secondary ${align === "center" ? "mx-auto max-w-2xl" : "mt-4 max-w-2xl"}`}>
          {description}
        </p>
      )}
    </header>
  );
}
