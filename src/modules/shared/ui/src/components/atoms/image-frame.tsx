interface ImageFrameProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
}

export function ImageFrame({ src, alt, ratio = "16 / 9", className = "", priority = false }: ImageFrameProps) {
  return (
    <div
      className={`bg-elevated overflow-hidden rounded-md border border-line ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
