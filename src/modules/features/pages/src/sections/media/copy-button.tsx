"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
}

export function CopyButton({ text, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 text-small font-semibold text-accent"
    >
      {copied ? (
        <Check strokeWidth={1.5} className="h-4 w-4" aria-hidden />
      ) : (
        <Copy strokeWidth={1.5} className="h-4 w-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
