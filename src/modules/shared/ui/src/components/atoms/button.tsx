import type { ComponentProps } from "react";
import { Link } from "@/modules/cores/i18n/src/config/routing";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

const BASE = "btn";
const VARIANTS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  "on-dark": "btn-on-dark",
};

interface ButtonProps {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = "primary", href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export type { ComponentProps };
