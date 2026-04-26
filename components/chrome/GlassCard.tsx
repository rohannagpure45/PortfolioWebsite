import type { CSSProperties, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function GlassCard({ children, className = "", style }: GlassCardProps) {
  return (
    <div className={`gc ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
