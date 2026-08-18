import React from "react";

type Tone = "note" | "accent" | "alert";

const toneClasses: Record<Tone, { box: string; label: string }> = {
  note: { box: "border-bezel bg-panel-raised", label: "text-readout-muted" },
  accent: { box: "border-lamp-dim bg-lamp-soft", label: "text-lamp" },
  alert: { box: "border-lamp-red/40 bg-lamp-red-soft", label: "text-lamp-red" },
};

/**
 * A labelled readout block on the panel: an engraved caption strip above the
 * value, with a coloured edge marking which subsystem it belongs to.
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
    <div className={`rounded-box border border-l-[3px] ${t.box} p-3 shadow-bezel ${className}`}>
      <div
        className={`flex items-center gap-1.5 mb-1 font-mono text-[10px] uppercase tracking-[0.14em] ${t.label}`}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-xs md:text-sm text-readout-soft leading-relaxed">
        {children}
      </div>
    </div>
  );
};
