import React from "react";

type PanelTone = "raised" | "sunken" | "flat";

const toneClasses: Record<PanelTone, string> = {
  raised: "bg-panel border-bezel shadow-bezel",
  sunken: "bg-well border-bezel",
  flat: "bg-chassis border-bezel",
};

/**
 * A panel mounted on the rack. Depth is a machined bezel — an inset top
 * highlight over a bottom shadow — never a blurred card floating in space.
 */
export const Panel: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { tone?: PanelTone }
> = ({ tone = "raised", className = "", children, ...rest }) => (
  <div
    className={`relative rounded-panel border ${toneClasses[tone]} ${className}`}
    {...rest}
  >
    {children}
  </div>
);

/**
 * The engraved title strip of a panel: a mono label, an optional right-hand
 * slot, and the machined groove that separates it from the controls below.
 */
export const PanelHeader: React.FC<{
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}> = ({ label, icon, right, className = "" }) => (
  <div
    className={`flex items-center justify-between gap-2 pb-2 mb-2 border-b border-bezel-strong ${className}`}
  >
    <div className="flex items-center gap-1.5 min-w-0">
      {icon}
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-readout-muted truncate">
        {label}
      </span>
    </div>
    {right}
  </div>
);
