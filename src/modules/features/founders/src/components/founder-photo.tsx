"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { FounderAvatar } from "./founder-avatar";

const frame = "size-28 border-4 border-surface bg-surface text-h3 shadow-sm";

export function FounderPhoto({
  name,
  photo,
  openLabel,
  closeLabel,
}: {
  name: string;
  photo?: string;
  openLabel: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!photo) {
    return <FounderAvatar name={name} className={frame} />;
  }

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={() => dialogRef.current?.showModal()}
      >
        <FounderAvatar name={name} photo={photo} className={frame} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={name}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-4 backdrop:bg-navy/80 open:flex open:items-center open:justify-center sm:p-8"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="flex w-full max-w-3xl flex-col items-end gap-3">
          <button
            type="button"
            aria-label={closeLabel}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink"
            onClick={() => dialogRef.current?.close()}
          >
            <X aria-hidden="true" strokeWidth={2} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={name}
            className="max-h-[calc(100dvh-6.5rem)] w-full rounded-lg object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
