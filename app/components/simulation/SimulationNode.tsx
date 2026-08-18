"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { SimulationNodeData, ComponentCategory } from "@/app/lib/types";
import { Info } from "lucide-react";
import { Badge, CornerTicks } from "@/app/components/ui";

// A drafted box carries its category as an ink colour on the corner ticks and
// the mono call-out label. The heavy black border is reserved for "active in
// this step", so category colour never competes with the step highlight.
const categoryInk: Record<ComponentCategory, string> = {
  client: "var(--color-cat-client)",
  compute: "var(--color-cat-compute)",
  storage: "var(--color-cat-storage)",
  network: "var(--color-cat-network)",
  security: "var(--color-cat-security)",
  queue: "var(--color-cat-queue)",
  analytics: "var(--color-cat-analytics)",
};

const HANDLE_SIDES = [
  { position: Position.Left, id: "l" },
  { position: Position.Right, id: "r" },
  { position: Position.Top, id: "t" },
  { position: Position.Bottom, id: "b" },
] as const;

const HANDLE_CLASS =
  "!w-1.5 !h-1.5 !rounded-none !bg-rule-strong !border-0 !opacity-0 group-hover:!opacity-100 group-hover:!bg-ink";

export const SimulationNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as SimulationNodeData;
  // The tooltip is opt-in only. The step narration already lives in the
  // walkthrough panel, so auto-opening it here just covered up the diagram.
  const [showTooltip, setShowTooltip] = useState(false);

  const ink = categoryInk[nodeData.category] ?? categoryInk.compute;
  const isActive = Boolean(nodeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && nodeData.isAnimated !== false;

  return (
    <div
      className={`relative group rounded-box transition-all duration-300 ease-plot select-none w-[220px] min-h-[88px] flex flex-col justify-center bg-paper-raised ${
        isActive
          ? `border-2 border-ink ${isAnimated ? "node-pulse-active" : "shadow-drawn"}`
          : selected
          ? "border border-ink-muted shadow-sheet"
          : "border border-rule hover:border-rule-strong shadow-sheet"
      }`}
    >
      {/* Registration ticks — what makes the box read as a technical drawing.
          They carry the category ink. */}
      <CornerTicks color={isActive ? "var(--color-ink)" : ink} />

      {/* Both a source and a target handle on every side, so each edge can name
          the exact pair it wants ("r-s" -> "l-t") instead of letting React Flow
          guess and send the line looping around the diagram. */}
      {HANDLE_SIDES.map(({ position, id }) => (
        <React.Fragment key={id}>
          <Handle type="target" position={position} id={`${id}-t`} className={HANDLE_CLASS} />
          <Handle type="source" position={position} id={`${id}-s`} className={HANDLE_CLASS} />
        </React.Fragment>
      ))}

      <div className="p-3 flex flex-col justify-center min-h-[88px]">
        {/* Title block: category ident, name, spec line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-base shrink-0 w-7 h-7 rounded-tick border flex items-center justify-center bg-paper"
              style={{ borderColor: ink }}
            >
              {nodeData.emoji}
            </span>
            <div className="min-w-0">
              <span
                className="block font-mono text-[9px] uppercase tracking-[0.16em] truncate"
                style={{ color: ink }}
              >
                {nodeData.category}
              </span>
              <h4 className="text-xs font-bold text-ink truncate tracking-tight">
                {nodeData.label}
              </h4>
              {nodeData.subLabel && (
                <p className="text-[10px] text-ink-muted truncate leading-tight font-mono">
                  {nodeData.subLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowTooltip((prev) => !prev); }}
            className="text-ink-faint hover:text-accent p-0.5 transition-colors shrink-0"
            aria-label="Component info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live status — a ruled annotation line under the title block. */}
        {isActive && nodeData.statusMessage && (
          <div className="mt-2 pt-1.5 border-t border-ink/50 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 bg-ink shrink-0 ${isAnimated ? "tick-sweep" : ""}`}
            />
            <span className="text-[10px] text-ink font-mono font-medium truncate">
              {nodeData.statusMessage}
            </span>
          </div>
        )}
      </div>

      {/* Detail call-out on tap — a note pinned above the drawing. */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-box bg-paper-raised border border-ink shadow-lift text-left pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-rule">
            <span className="text-base">{nodeData.emoji}</span>
            <span className="text-xs font-bold text-ink">{nodeData.label}</span>
            <span
              className="ml-auto font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-tick border"
              style={{ color: ink, borderColor: ink }}
            >
              {nodeData.category}
            </span>
          </div>
          <p className="text-[11px] text-ink-soft leading-relaxed mb-2">
            {nodeData.description}
          </p>
          {nodeData.analogy && (
            <div className="bg-paper-sunken rounded-tick p-1.5 border-l-2 border-accent text-[10px] text-ink-soft mb-1.5">
              <span className="font-mono text-accent">উপমা: </span>
              {nodeData.analogy}
            </div>
          )}
          {nodeData.techSpecs && (
            <Badge>SPEC: {nodeData.techSpecs}</Badge>
          )}
        </div>
      )}
    </div>
  );
};
