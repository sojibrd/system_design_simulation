import React from "react";

type Variant = "primary" | "alert" | "ghost" | "outline";

// Every button is a physical key: it stands off the panel and travels down when
// pressed. The travel is the feedback — no colour-shift-only buttons.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-lamp text-chassis border-lamp-dim shadow-key hover:brightness-110 active:translate-y-[2px] active:shadow-none",
  alert:
    "bg-lamp-red text-chassis border-lamp-red/70 shadow-key hover:brightness-110 active:translate-y-[2px] active:shadow-none",
  outline:
    "bg-panel-raised text-readout border-bezel-strong shadow-key hover:bg-panel-hi hover:border-bezel-hi active:translate-y-[2px] active:shadow-none",
  ghost:
    "bg-transparent text-readout-muted border-transparent hover:text-readout hover:bg-panel-hi",
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-box border font-semibold uppercase tracking-wide " +
  "transition-all duration-100 ease-instrument select-none " +
  "disabled:opacity-35 disabled:pointer-events-none disabled:shadow-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lamp";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
> = ({ variant = "outline", className = "", children, ...rest }) => (
  <button
    type="button"
    className={`${base} px-4 py-2 text-xs md:text-sm ${variantClasses[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export const IconButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
> = ({ variant = "outline", className = "", children, ...rest }) => (
  <button
    type="button"
    className={`${base} p-2 ${variantClasses[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
