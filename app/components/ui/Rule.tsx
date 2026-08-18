import React from "react";

/**
 * A drafted rule. `weight="hair"` is the default sheet division; `heavy` is the
 * inked line that separates a title block from its contents.
 */
export const Rule: React.FC<{
  weight?: "hair" | "heavy";
  className?: string;
}> = ({ weight = "hair", className = "" }) => (
  <div
    className={`w-full ${
      weight === "heavy" ? "h-px bg-ink/70" : "h-px bg-rule"
    } ${className}`}
  />
);

/**
 * The four corner registration ticks of a drafted box. Purely decorative — it
 * is what makes a plain rectangle read as a technical drawing.
 */
export const CornerTicks: React.FC<{ color?: string }> = ({
  color = "var(--color-rule-strong)",
}) => (
  <>
    {[
      "left-0 top-0 border-l border-t",
      "right-0 top-0 border-r border-t",
      "left-0 bottom-0 border-l border-b",
      "right-0 bottom-0 border-r border-b",
    ].map((pos) => (
      <span
        key={pos}
        aria-hidden
        className={`pointer-events-none absolute w-2 h-2 ${pos}`}
        style={{ borderColor: color }}
      />
    ))}
  </>
);
