import React from "react";

type PanelTone = "raised" | "sunken" | "flat";

const toneClasses: Record<PanelTone, string> = {
  raised: "bg-paper-raised border-rule shadow-sheet",
  sunken: "bg-paper-sunken border-rule",
  flat: "bg-paper border-rule",
};

/**
 * A sheet of paper laid on the drafting board. Square corners, a hairline
 * rule for a border, and elevation expressed as a stacked edge — never a glow.
 */
export const Panel: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { tone?: PanelTone }
> = ({ tone = "raised", className = "", children, ...rest }) => (
  <div
    className={`relative rounded-sheet border ${toneClasses[tone]} ${className}`}
    {...rest}
  >
    {children}
  </div>
);

/**
 * The title block of a drawing: a mono label, optional right-hand slot, and the
 * heavy rule underneath that a real drafting sheet always carries.
 */
export const PanelHeader: React.FC<{
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}> = ({ label, icon, right, className = "" }) => (
  <div
    className={`flex items-center justify-between gap-2 pb-2 mb-2 border-b border-ink/60 ${className}`}
  >
    <div className="flex items-center gap-1.5 min-w-0">
      {icon}
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted truncate">
        {label}
      </span>
    </div>
    {right}
  </div>
);
