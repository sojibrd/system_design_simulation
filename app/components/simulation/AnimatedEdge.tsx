"use client";

import React from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";
import { SimulationEdgeData, SignalKind } from "@/app/lib/types";

// Data files name the MEANING of a hop; the drawing decides its ink.
const signalInk: Record<SignalKind, string> = {
  request: "var(--color-signal-request)",
  write: "var(--color-signal-write)",
  read: "var(--color-signal-read)",
  success: "var(--color-signal-success)",
  cache: "var(--color-signal-cache)",
  event: "var(--color-signal-event)",
  error: "var(--color-signal-error)",
  meta: "var(--color-signal-meta)",
};

export const AnimatedFlowEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const edgeData = (data as unknown as SimulationEdgeData) || {};
  const isActive = Boolean(edgeData.isActive);
  // Highlight stays on after the flow finishes, but the motion stops.
  const isAnimated = isActive && edgeData.isAnimated !== false;
  const isReverse = Boolean(edgeData.isReverse);
  const ink = signalInk[edgeData.particleColor ?? "request"];

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    // Schematic corners are drafted, not rounded off.
    borderRadius: 4,
  });

  // Calculate label anchor position: for left-to-right edges, bias towards 38% from source to ensure complete clearance from target node
  let renderLabelX = labelX;
  if (targetX > sourceX + 60) {
    renderLabelX = sourceX + (targetX - sourceX) * 0.38;
  } else if (sourceX > targetX + 60) {
    renderLabelX = targetX + (sourceX - targetX) * 0.38;
  }

  return (
    <>
      {/* Base drafted line — dashed while dormant, solid once the step lights it */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={isActive ? ink : "var(--color-rule-strong)"}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={isActive ? undefined : "3 4"}
        strokeOpacity={isActive ? 0.35 : 1}
        className="transition-colors duration-300"
      />

      {/* The live hop, plotted over the base line */}
      {isActive && (
        <path
          d={edgePath}
          fill="none"
          stroke={ink}
          strokeWidth={2}
          strokeLinecap="butt"
          className={
            isAnimated
              ? isReverse
                ? "animated-edge-active-reverse"
                : "animated-edge-active"
              : undefined
          }
        />
      )}

      {/* The packet: a square parcel travelling the line, not a glowing orb */}
      {isAnimated && (
        <g>
          <rect
            x={-5}
            y={-5}
            width={10}
            height={10}
            fill="var(--color-paper-raised)"
            stroke={ink}
            strokeWidth={2}
          >
            <animateMotion
              path={edgePath}
              dur="1.2s"
              repeatCount="indefinite"
              calcMode="linear"
              keyPoints={isReverse ? "1;0" : "0;1"}
              keyTimes="0;1"
            />
          </rect>
          <rect x={-2} y={-2} width={4} height={4} fill={ink}>
            <animateMotion
              path={edgePath}
              dur="1.2s"
              repeatCount="indefinite"
              calcMode="linear"
              keyPoints={isReverse ? "1;0" : "0;1"}
              keyTimes="0;1"
            />
          </rect>
        </g>
      )}

      {/* Edge Label Badge — only the hop that is live in this step carries a
          label, so the canvas never shows more than one at a time. */}
      {isActive && edgeData.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -100%) translate(${renderLabelX}px,${labelY - 8}px)`,
              pointerEvents: "all",
              color: ink,
              borderColor: ink,
            }}
            className="px-1.5 py-0.5 rounded-tick text-[10px] font-mono border bg-paper-raised select-none max-w-[170px] truncate font-medium"
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
