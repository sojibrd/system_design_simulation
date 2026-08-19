"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useIsCompact } from "@/app/hooks/useMediaQuery";

/** Everything a keyboard can land on inside the sheet. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A region that is an ordinary panel on a wide screen and a bottom sheet on a
 * phone.
 *
 * The distinction matters because the whole point of this app is watching the
 * animation while reading the step. On desktop both fit side by side; on a
 * phone they cannot, so the explanation floats OVER the canvas instead of
 * stealing half of an already short viewport.
 *
 * That difference is not only visual, so it cannot be left to CSS alone: on a
 * phone this really is a dialog laid over the content, and on a wide screen it
 * really is just a column. Announcing "dialog" in both places would tell a
 * screen-reader user they are trapped in something they are not.
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
  const isCompact = useIsCompact();
  const isOverlay = open && isCompact;
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  // Callers pass an inline arrow, so `onClose` is a new function on every
  // render of the page. Read it through a ref: the effect below then depends
  // on the OVERLAY STATE alone, and does not tear down — stealing focus back
  // to the opener — every time the step advances behind the sheet.
  // Kept current by an effect declared FIRST, so it is already up to date by
  // the time the overlay effect below runs on the same commit.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const close = useCallback(() => onCloseRef.current(), []);

  // Only while it is genuinely an overlay: Escape dismisses it, focus moves
  // into it on open, Tab cycles WITHIN it, and focus goes back to whatever
  // opened it on close. Without the last part, dismissing the sheet drops the
  // keyboard user back at the top of the document.
  useEffect(() => {
    if (!isOverlay) return;

    returnFocusTo.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Backdrop and canvas are covered while this is open, so the sheet
      // claims the tab ring — which is what `aria-modal` promises.
      const panel = panelRef.current;
      if (!panel) return;

      const stops = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (stops.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;

      if (!panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusTo.current?.focus();
    };
  }, [isOverlay, close]);

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
        ref={panelRef}
        role={isOverlay ? "dialog" : undefined}
        aria-label={isOverlay ? label : undefined}
        /* The backdrop really does shut the canvas off, and Tab is trapped
           above — so this is a modal, and says so. */
        aria-modal={isOverlay ? true : undefined}
        tabIndex={isOverlay ? -1 : undefined}
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
