"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { SimulationNodeData } from "@/app/lib/types";
import { Info } from "lucide-react";

// `stripe` and `tint` carry the category identity on a resting node. The cyan
// border + glow is reserved for "active in this step", so the category colour
// deliberately never touches the border.
const categoryColors: Record<
  string,
  { border: string; badge: string; text: string; stripe: string; tint: string }
> = {
  client: {
    border: "border-blue-500/40",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    text: "text-blue-400",
    stripe: "bg-blue-500",
    tint: "bg-blue-500/10",
  },
  compute: {
    border: "border-violet-500/40",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    text: "text-violet-400",
    stripe: "bg-violet-500",
    tint: "bg-violet-500/10",
  },
  storage: {
    border: "border-emerald-500/40",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    text: "text-emerald-400",
    stripe: "bg-emerald-500",
    tint: "bg-emerald-500/10",
  },
  network: {
    border: "border-cyan-500/40",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    text: "text-cyan-400",
    stripe: "bg-cyan-500",
    tint: "bg-cyan-500/10",
  },
  security: {
    border: "border-amber-500/40",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    text: "text-amber-400",
    stripe: "bg-amber-500",
    tint: "bg-amber-500/10",
  },
  queue: {
    border: "border-pink-500/40",
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    text: "text-pink-400",
    stripe: "bg-pink-500",
    tint: "bg-pink-500/10",
  },
  analytics: {
    border: "border-rose-500/40",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    text: "text-rose-400",
    stripe: "bg-rose-500",
    tint: "bg-rose-500/10",
  },
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

  const colors = categoryColors[nodeData.category] || categoryColors.compute;
  const isActive = Boolean(nodeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && nodeData.isAnimated !== false;

  return (
    <div
      className={`relative group rounded-xl transition-all duration-300 select-none w-[220px] min-h-[88px] flex flex-col justify-center ${
        isActive
          ? "bg-zinc-900 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)] ring-2 ring-cyan-500/30 scale-105"
          : selected
          ? "bg-zinc-900 border border-zinc-500 shadow-md"
          : "bg-zinc-900 border border-zinc-700/60 hover:border-zinc-600 shadow"
      }`}
    >
      {/* Category stripe — the only place a resting node carries its colour. */}
      <span
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${colors.stripe} ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
      />
      {/* Both a source and a target handle on every side, so each edge can name
          the exact pair it wants ("r-s" -> "l-t") instead of letting React Flow
          guess and send the line looping around the diagram. */}
      {HANDLE_SIDES.map(({ position, id }) => (
        <React.Fragment key={id}>
          <Handle
            type="target"
            position={position}
            id={`${id}-t`}
            className="!w-2 !h-2 !bg-zinc-600 !border-zinc-900 !opacity-0 group-hover:!opacity-100 group-hover:!bg-cyan-400"
          />
          <Handle
            type="source"
            position={position}
            id={`${id}-s`}
            className="!w-2 !h-2 !bg-zinc-600 !border-zinc-900 !opacity-0 group-hover:!opacity-100 group-hover:!bg-cyan-400"
          />
        </React.Fragment>
      ))}

      <div className="p-3 pl-4 flex flex-col justify-center min-h-[88px]">
        {/* Header: Emoji + Title */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`text-lg shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${colors.tint}`}
            >
              {nodeData.emoji}
            </span>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-zinc-100 truncate tracking-tight">
                {nodeData.label}
              </h4>
              {nodeData.subLabel && (
                <p className="text-[10px] text-zinc-400 truncate leading-tight font-mono">
                  {nodeData.subLabel}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowTooltip((prev) => !prev); }}
            className="text-zinc-500 hover:text-cyan-400 p-0.5 transition-colors shrink-0"
            aria-label="Component info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Active Status Badge */}
        {isActive && nodeData.statusMessage && (
          <div className="mt-2 py-1 px-2 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 ${
                isAnimated ? "animate-ping" : ""
              }`}
            />
            <span className="text-[10px] text-cyan-200 font-medium truncate">
              {nodeData.statusMessage}
            </span>
          </div>
        )}
      </div>

      {/* Tooltip Popup on Hover / Tap */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-zinc-950/95 border border-cyan-500/40 shadow-2xl text-left backdrop-blur-md pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-zinc-800">
            <span className="text-base">{nodeData.emoji}</span>
            <span className="text-xs font-bold text-zinc-100">{nodeData.label}</span>
            <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded border ${colors.badge}`}>
              {nodeData.category}
            </span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed mb-2">
            {nodeData.description}
          </p>
          {nodeData.analogy && (
            <div className="bg-zinc-900/90 rounded-lg p-1.5 border border-zinc-800 text-[10px] text-zinc-400 mb-1.5">
              <span className="font-semibold text-cyan-300">💡 Analogy: </span>
              {nodeData.analogy}
            </div>
          )}
          {nodeData.techSpecs && (
            <div className="text-[9px] font-mono text-zinc-500">
              Tech: <span className="text-zinc-400">{nodeData.techSpecs}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
