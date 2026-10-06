interface ImageFrameProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function ImageFrame({
  src,
  alt,
  ratio = "16 / 9",
  className = "",
  priority = false,
  width = 1600,
  height = 900,
}: ImageFrameProps) {
  return (
    <div
      className={`bg-elevated overflow-hidden rounded-md border border-line ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
