import React from "react";

type Tone = "neutral" | "accent" | "alert" | "confirm";

const toneClasses: Record<Tone, string> = {
  neutral: "border-bezel-strong text-readout-muted bg-chassis",
  accent: "border-lamp-dim text-lamp bg-lamp-soft",
  alert: "border-lamp-red/50 text-lamp-red bg-lamp-red-soft",
  confirm: "border-lamp-green/50 text-lamp-green bg-lamp-green-soft",
};

/**
 * An engraved plate on the panel — mono, uppercase, square. Used for specs,
 * counts and category names, never as a decorative pill.
 */
export const Badge: React.FC<{
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}> = ({ tone = "neutral", className = "", children }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-tick border px-1.5 py-0.5 font-mono text-[10px] tracking-wide ${toneClasses[tone]} ${className}`}
  >
    {children}
  </span>
);
