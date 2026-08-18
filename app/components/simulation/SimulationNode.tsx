"use client";

import React, { useState } from "react";
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

export const SimulationNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as SimulationNodeData;
  // The tooltip is opt-in only. The step narration already lives in the
  // walkthrough panel, so auto-opening it here just covered up the diagram.
  const [showTooltip, setShowTooltip] = useState(false);

  const color = categoryColor[nodeData.category] ?? categoryColor.compute;
  const isActive = Boolean(nodeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && nodeData.isAnimated !== false;

  return (
    <div
      data-active={isActive}
      data-animated={isAnimated}
      data-selected={Boolean(selected)}
      className="unit relative group select-none w-[220px] min-h-[88px] flex flex-col justify-center"
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

      <div className="px-3.5 py-3 flex flex-col justify-center min-h-[88px]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="surface-well text-base shrink-0 w-8 h-8 flex items-center justify-center"
              style={{ color }}
            >
              {nodeData.emoji}
            </span>
            <div className="min-w-0">
              <span className="flex items-center gap-1.5 min-w-0">
                <Lamp lit={isActive} blink={isAnimated} color={color} />
                <span className="t-label truncate" style={{ color }}>
                  {nodeData.category}
                </span>
              </span>
              <h4 className="t-title text-xs truncate">{nodeData.label}</h4>
              {nodeData.subLabel && (
                <p className="t-mono t-caption truncate leading-tight">
                  {nodeData.subLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowTooltip((prev) => !prev); }}
            className="control control--quiet p-0.5 shrink-0"
            aria-label="Component info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live status readout, shown only while this unit is engaged. */}
        {isActive && nodeData.statusMessage && (
          <div className="surface-well mt-2 px-1.5 py-1 flex items-center gap-1.5">
            <Lamp lit blink={isAnimated} color="var(--t-accent)" />
            <span className="t-mono t-accent text-[10px] font-medium truncate">
              {nodeData.statusMessage}
            </span>
          </div>
        )}
      </div>

      {/* Detail card on tap. */}
      {showTooltip && (
        <div className="surface-raised absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-left pointer-events-none">
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
