export function LogoRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      {children}
    </div>
  );
}

export function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-elevated flex h-16 w-36 items-center justify-center rounded-md border border-line px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="max-h-10 w-auto object-contain" />
    </div>
  );
}
