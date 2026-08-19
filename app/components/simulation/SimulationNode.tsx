"use client";

import React, { useEffect, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { SimulationNodeData, ComponentCategory } from "@/app/lib/types";
import { Info } from "lucide-react";
import { Badge, Lamp, Ornament } from "@/app/components/ui";

// The node names its category; the theme supplies the colour behind that name.
const categoryColor: Record<ComponentCategory, string> = {
  client: "var(--t-cat-client)",
  compute: "var(--t-cat-compute)",
  storage: "var(--t-cat-storage)",
  network: "var(--t-cat-network)",
  security: "var(--t-cat-security)",
  queue: "var(--t-cat-queue)",
  analytics: "var(--t-cat-analytics)",
};

const HANDLE_SIDES = [
  { position: Position.Left, id: "l" },
  { position: Position.Right, id: "r" },
  { position: Position.Top, id: "t" },
  { position: Position.Bottom, id: "b" },
] as const;

/** Roughly how tall the detail card gets — enough to decide which way it opens. */
const CARD_CLEARANCE = 260;

export const SimulationNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as SimulationNodeData;
  // The tooltip is opt-in only. The step narration already lives in the
  // walkthrough panel, so auto-opening it here just covered up the diagram.
  const [showTooltip, setShowTooltip] = useState(false);
  // The card normally hangs above the unit, but the canvas clips its own
  // bounds — a unit near the top of the stage would open into nothing.
  const [openUpwards, setOpenUpwards] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dismissable by tapping away or by Escape. This is also what keeps ONE card
  // open at a time: opening another unit's card is a pointer-down out here.
  useEffect(() => {
    if (!showTooltip) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setShowTooltip(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowTooltip(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showTooltip]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => {
      if (prev) return false;
      const top = rootRef.current?.getBoundingClientRect().top ?? CARD_CLEARANCE;
      setOpenUpwards(top > CARD_CLEARANCE);
      return true;
    });
  };

  const color = categoryColor[nodeData.category] ?? categoryColor.compute;
  const isActive = Boolean(nodeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && nodeData.isAnimated !== false;

  return (
    <div
      ref={rootRef}
      data-active={isActive}
      data-animated={isAnimated}
      data-selected={Boolean(selected)}
      className="unit relative group select-none w-[440px] min-h-[176px] flex flex-col justify-center"
    >
      {/* Whatever the theme puts in a unit corners. */}
      <Ornament color={color} />

      {/* Both a source and a target handle on every side, so each edge can name
          the exact pair it wants ("r-s" -> "l-t") instead of letting React Flow
          guess and send the line looping around the diagram. */}
      {HANDLE_SIDES.map(({ position, id }) => (
        <React.Fragment key={id}>
          <Handle type="target" position={position} id={`${id}-t`} className="terminal" />
          <Handle type="source" position={position} id={`${id}-s`} className="terminal" />
        </React.Fragment>
      ))}

      <div className="px-7 py-6 flex flex-col justify-center min-h-[176px]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-5 min-w-0">
            <span
              className="surface-well text-3xl shrink-0 w-16 h-16 flex items-center justify-center"
              style={{ color }}
            >
              {nodeData.emoji}
            </span>
            <div className="min-w-0">
              <span className="flex items-center gap-3 min-w-0">
                <Lamp lit={isActive} blink={isAnimated} color={color} />
                <span className="t-label truncate" style={{ color }}>
                  {nodeData.category}
                </span>
              </span>
              <h4 className="t-title text-2xl truncate">{nodeData.label}</h4>
              {nodeData.subLabel && (
                <p className="t-mono t-caption text-sm truncate leading-tight">
                  {nodeData.subLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleTooltip(); }}
            className="control control--quiet p-1 shrink-0"
            aria-expanded={showTooltip}
            aria-label="Component info"
          >
            <Info className="w-7 h-7" />
          </button>
        </div>

        {/* Live status readout, shown only while this unit is engaged. */}
        {isActive && nodeData.statusMessage && (
          <div className="surface-well mt-4 px-3 py-2 flex items-center gap-3">
            <Lamp lit blink={isAnimated} color="var(--t-accent)" />
            <span className="t-mono t-accent text-base truncate">
              {nodeData.statusMessage}
            </span>
          </div>
        )}
      </div>

      {/* Detail card on tap. */}
      {showTooltip && (
        <div
          className={`surface-raised absolute z-50 left-1/2 -translate-x-1/2 w-64 p-3 text-left pointer-events-none ${
            openUpwards ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 pb-1 seam-b">
            <span className="text-base">{nodeData.emoji}</span>
            <span className="t-title text-xs">{nodeData.label}</span>
            <span className="chip ml-auto" style={{ color, borderColor: color }}>
              {nodeData.category}
            </span>
          </div>
          <p className="t-body text-[11px] mb-2">{nodeData.description}</p>
          {nodeData.analogy && (
            <div className="surface-well p-1.5 text-[10px] mb-1.5">
              <span className="t-mono t-accent">Analogy: </span>
              <span className="t-body">{nodeData.analogy}</span>
            </div>
          )}
          {nodeData.techSpecs && <Badge>SPEC: {nodeData.techSpecs}</Badge>}
        </div>
      )}
    </div>
  );
};
