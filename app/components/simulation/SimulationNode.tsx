"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { SimulationNodeData, ComponentCategory } from "@/app/lib/types";
import { Info } from "lucide-react";
import { Badge, BezelScrews } from "@/app/components/ui";

// Each unit on the rack carries a category lamp. The amber "engaged" ring is
// reserved for "active in this step", so category colour never competes with it.
const categoryLamp: Record<ComponentCategory, string> = {
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

// Handles are the unit terminal posts.
const HANDLE_CLASS =
  "!w-2 !h-2 !rounded-sm !bg-bezel-strong !border !border-chassis !opacity-0 group-hover:!opacity-100 group-hover:!bg-lamp";

export const SimulationNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as SimulationNodeData;
  // The tooltip is opt-in only. The step narration already lives in the
  // walkthrough panel, so auto-opening it here just covered up the diagram.
  const [showTooltip, setShowTooltip] = useState(false);

  const lamp = categoryLamp[nodeData.category] ?? categoryLamp.compute;
  const isActive = Boolean(nodeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && nodeData.isAnimated !== false;

  return (
    <div
      className={`relative group rounded-panel transition-all duration-300 ease-instrument select-none w-[220px] min-h-[88px] flex flex-col justify-center bg-panel-raised border ${
        isActive
          ? isAnimated
            ? "border-lamp-dim node-pulse-active"
            : "border-lamp-dim shadow-raised ring-1 ring-lamp/60"
          : selected
          ? "border-bezel-hi shadow-bezel"
          : "border-bezel shadow-bezel hover:border-bezel-strong"
      }`}
    >
      {/* Four bezel screws — what makes the box read as a mounted unit. */}
      <BezelScrews />

      {/* Both a source and a target handle on every side, so each edge can name
          the exact pair it wants ("r-s" -> "l-t") instead of letting React Flow
          guess and send the line looping around the diagram. */}
      {HANDLE_SIDES.map(({ position, id }) => (
        <React.Fragment key={id}>
          <Handle type="target" position={position} id={`${id}-t`} className={HANDLE_CLASS} />
          <Handle type="source" position={position} id={`${id}-s`} className={HANDLE_CLASS} />
        </React.Fragment>
      ))}

      <div className="px-3.5 py-3 flex flex-col justify-center min-h-[88px]">
        {/* Unit faceplate: status lamp, engraved category, name, spec line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="text-base shrink-0 w-8 h-8 rounded-box border border-bezel-strong bg-well flex items-center justify-center shadow-well"
              style={{ color: lamp }}
            >
              {nodeData.emoji}
            </span>
            <div className="min-w-0">
              <span className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`w-1.5 h-1.5 shrink-0 ${isActive ? "lamp" : "lamp lamp-off"}`}
                  style={isActive ? { color: lamp } : undefined}
                />
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.18em] truncate"
                  style={{ color: lamp }}
                >
                  {nodeData.category}
                </span>
              </span>
              <h4 className="text-xs font-bold text-readout truncate tracking-tight uppercase">
                {nodeData.label}
              </h4>
              {nodeData.subLabel && (
                <p className="text-[10px] text-readout-muted truncate leading-tight font-mono">
                  {nodeData.subLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowTooltip((prev) => !prev); }}
            className="text-readout-faint hover:text-lamp p-0.5 transition-colors shrink-0"
            aria-label="Component info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live status — a lit readout strip recessed into the faceplate. */}
        {isActive && nodeData.statusMessage && (
          <div className="mt-2 px-1.5 py-1 rounded-tick bg-well border border-bezel shadow-well flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 shrink-0 lamp text-lamp ${isAnimated ? "tick-sweep" : ""}`}
            />
            <span className="text-[10px] text-lamp font-mono font-medium truncate">
              {nodeData.statusMessage}
            </span>
          </div>
        )}
      </div>

      {/* Detail card on tap — a service label pulled out of the unit. */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-panel bg-panel-raised border border-bezel-hi shadow-raised text-left pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-bezel">
            <span className="text-base">{nodeData.emoji}</span>
            <span className="text-xs font-bold text-readout uppercase">{nodeData.label}</span>
            <span
              className="ml-auto font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-tick border"
              style={{ color: lamp, borderColor: lamp }}
            >
              {nodeData.category}
            </span>
          </div>
          <p className="text-[11px] text-readout-soft leading-relaxed mb-2">
            {nodeData.description}
          </p>
          {nodeData.analogy && (
            <div className="bg-well rounded-tick p-1.5 border-l-2 border-lamp text-[10px] text-readout-soft mb-1.5">
              <span className="font-mono text-lamp">Analogy: </span>
              {nodeData.analogy}
            </div>
          )}
          {nodeData.techSpecs && <Badge>SPEC: {nodeData.techSpecs}</Badge>}
        </div>
      )}
    </div>
  );
};
