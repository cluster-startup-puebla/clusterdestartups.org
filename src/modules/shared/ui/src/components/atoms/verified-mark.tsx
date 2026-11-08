"use client";

import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function VerifiedMark({
  verified = true,
  className = "size-4",
}: {
  verified?: boolean;
  className?: string;
}) {
  const t = useTranslations("Verified");
  if (!verified) return null;

  return (
    <BadgeCheck
      aria-label={t("label")}
      strokeWidth={2.5}
      className={`verified-mark shrink-0 ${className}`}
    />
  );
}
