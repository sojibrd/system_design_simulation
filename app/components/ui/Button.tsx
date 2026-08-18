import React from "react";

type Variant = "primary" | "alert" | "ghost" | "outline";

const variantClasses: Record<Variant, string> = {
  // The inked-in button: solid ink, offset hard shadow, presses into the paper.
  primary:
    "bg-ink text-paper border-ink shadow-drawn hover:bg-accent hover:border-accent active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  alert:
    "bg-alert text-paper border-alert shadow-drawn hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  outline:
    "bg-paper-raised text-ink border-rule-strong hover:border-ink hover:bg-accent-soft",
  ghost:
    "bg-transparent text-ink-muted border-transparent hover:text-ink hover:bg-paper-wash",
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-box border font-semibold " +
  "transition-all duration-150 ease-plot select-none " +
  "disabled:opacity-40 disabled:pointer-events-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
