"use client";

import React from "react";

/**
 * A region that is an ordinary panel on a wide screen and a bottom sheet on a
 * phone.
 *
 * The distinction matters because the whole point of this app is watching the
 * animation while reading the step. On desktop both fit side by side; on a
 * phone they cannot, so the explanation floats OVER the canvas instead of
 * stealing half of an already short viewport.
 *
 * Layout only — every visual value still comes from the theme contract.
 */
export const Sheet: React.FC<{
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}> = ({ open, onClose, label, className = "", children }) => {
  if (!open) return null;

  return (
    <>
      {/* Phone only: tapping the backdrop dismisses the sheet. Both layers are
          absolute inside the stage, not fixed to the viewport, so the sheet
          covers the canvas but never the playback controls below it. */}
      <button
        type="button"
        aria-label={`Close ${label}`}
        onClick={onClose}
        className="overlay absolute inset-0 z-40 lg:hidden"
      />

      <div
        role="dialog"
        aria-label={label}
        className={`
          absolute inset-x-0 bottom-0 z-50 h-[62%] max-h-full
          lg:static lg:z-auto lg:h-full lg:max-h-none
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};
