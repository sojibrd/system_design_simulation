import React from "react";

/**
 * A seam between panels. `heavy` is the machined groove that separates a
 * faceplate title strip from its controls.
 */
export const Rule: React.FC<{
  weight?: "hair" | "heavy";
  className?: string;
}> = ({ weight = "hair", className = "" }) => (
  <div
    className={`w-full h-px ${
      weight === "heavy" ? "bg-bezel-strong" : "bg-bezel"
    } ${className}`}
  />
);

/**
 * The four screws holding a unit faceplate to the rack. Purely decorative —
 * it is what makes a plain rectangle read as mounted hardware.
 */
export const BezelScrews: React.FC = () => (
  <>
    {[
      "left-1.5 top-1.5",
      "right-1.5 top-1.5",
      "left-1.5 bottom-1.5",
      "right-1.5 bottom-1.5",
    ].map((pos) => (
      <span
        key={pos}
        aria-hidden
        className={`pointer-events-none absolute w-1 h-1 rounded-full bg-chassis ring-1 ring-bezel-hi/70 ${pos}`}
      />
    ))}
  </>
);
