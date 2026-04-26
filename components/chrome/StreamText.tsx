"use client";

import type { CSSProperties, ElementType } from "react";

interface StreamTextProps {
  text: string;
  as?: ElementType;
  baseDelay?: number;
  charDelay?: number;
  style?: CSSProperties;
  className?: string;
}

export default function StreamText({
  text,
  as: Tag = "span",
  baseDelay = 0.3,
  charDelay = 0.034,
  style = {},
  className,
}: StreamTextProps) {
  const chars = text.split("");
  let charIdx = 0;
  return (
    <Tag style={{ display: "block", ...style }} className={className}>
      {chars.map((ch, i) => {
        if (ch === " ") {
          return (
            <span key={i} style={{ display: "inline" }}>
              {" "}
            </span>
          );
        }
        const delay = baseDelay + charIdx++ * charDelay;
        return (
          <span
            key={i}
            style={{
              display: "inline",
              opacity: 0,
              animation: "wordStream 1.1s cubic-bezier(.16,1,.3,1) both",
              animationDelay: `${delay}s`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </Tag>
  );
}
