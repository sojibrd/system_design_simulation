import React from "react";

type Tone = "note" | "accent" | "alert";

const toneClasses: Record<Tone, { box: string; label: string }> = {
  note: { box: "border-rule bg-paper", label: "text-ink-muted" },
  accent: { box: "border-accent-line bg-accent-soft", label: "text-accent" },
  alert: { box: "border-alert/40 bg-alert-soft", label: "text-alert" },
};

/**
 * A margin note on the drawing: a heavy left rule, a mono caption, and the
 * body text. This is how the walkthrough carries its explanations.
 */
export const Callout: React.FC<{
  label: string;
  icon?: React.ReactNode;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}> = ({ label, icon, tone = "note", className = "", children }) => {
  const t = toneClasses[tone];

  return (
    <div className={`rounded-box border border-l-2 ${t.box} p-3 ${className}`}>
      <div
        className={`flex items-center gap-1.5 mb-1 font-mono text-[10px] uppercase tracking-[0.12em] ${t.label}`}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-xs md:text-sm text-ink-soft leading-relaxed">
        {children}
      </div>
    </div>
  );
};
