import React from "react";

type Tone = "neutral" | "accent" | "alert" | "confirm";

const toneClasses: Record<Tone, string> = {
  neutral: "border-rule-strong text-ink-muted bg-paper",
  accent: "border-accent-line text-accent bg-accent-soft",
  alert: "border-alert/50 text-alert bg-alert-soft",
  confirm: "border-confirm/50 text-confirm bg-confirm-soft",
};

/**
 * A stamped annotation — mono, uppercase, square. Used for specs, counts and
 * category names, never as a decorative pill.
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
