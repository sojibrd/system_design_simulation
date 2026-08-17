"use client";

import React from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";
import { SimulationEdgeData } from "@/app/lib/types";

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
  const isReverse = Boolean(edgeData.isReverse);
  const particleColor = edgeData.particleColor || "#22d3ee";

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      {/* Base static/dim edge */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={isActive ? "rgba(6, 182, 212, 0.3)" : "#27272a"}
        strokeWidth={isActive ? 2 : 1.5}
        strokeDasharray={isActive ? undefined : "4 4"}
        className="transition-colors duration-300"
      />

      {/* Active Glowing Flow Line */}
      {isActive && (
        <path
          d={edgePath}
          fill="none"
          stroke={particleColor}
          strokeWidth={2.5}
          className={isReverse ? "animated-edge-active-reverse" : "animated-edge-active"}
          filter="drop-shadow(0 0 4px rgba(6, 182, 212, 0.6))"
        />
      )}

      {/* Moving Packet / Dot along the path (SVG animateMotion) */}
      {isActive && (
        <g>
          {/* Outer glow ring */}
          <circle r="7" fill={particleColor} opacity="0.3">
            <animateMotion
              path={edgePath}
              dur="1.2s"
              repeatCount="indefinite"
              keyPoints={isReverse ? "1;0" : "0;1"}
              keyTimes="0;1"
            />
          </circle>
          {/* Core particle */}
          <circle r="3.5" fill="#ffffff">
            <animateMotion
              path={edgePath}
              dur="1.2s"
              repeatCount="indefinite"
              keyPoints={isReverse ? "1;0" : "0;1"}
              keyTimes="0;1"
            />
          </circle>
        </g>
      )}

      {/* Edge Label Badge */}
      {edgeData.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono border transition-all duration-300 select-none ${
              isActive
                ? "bg-zinc-950/95 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-105 font-semibold"
                : "bg-zinc-900/90 text-zinc-500 border-zinc-800"
            }`}
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
