export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`badge-brand ${className}`}>{children}</span>;
}
