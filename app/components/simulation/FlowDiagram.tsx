"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  ReactFlowInstance,
  Background,
  Controls,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
} from "@xyflow/react";
import { SimulationNode } from "./SimulationNode";
import { AnimatedFlowEdge } from "./AnimatedEdge";
import { CustomNodeType, CustomEdgeType } from "@/app/lib/types";

const FIT_VIEW_OPTIONS = { padding: 0.22, minZoom: 0.4, maxZoom: 1.5 };

interface FlowDiagramProps {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  /** Changing this re-fits the viewport — used when the canvas width changes. */
  fitViewSignal?: unknown;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  edges,
  fitViewSignal,
}) => {
  const instanceRef = useRef<ReactFlowInstance<
    CustomNodeType,
    CustomEdgeType
  > | null>(null);

  // The canvas width changes when the walkthrough panel is toggled; the CSS
  // grid transition takes a moment, so re-fit once it has settled.
  useEffect(() => {
    const timer = setTimeout(() => {
      instanceRef.current?.fitView(FIT_VIEW_OPTIONS);
    }, 260);

    return () => clearTimeout(timer);
  }, [fitViewSignal]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      simulationNode: SimulationNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      animatedFlowEdge: AnimatedFlowEdge,
    }),
    []
  );

  return (
    <div className="w-full h-full min-h-0 bg-zinc-950 rounded-xl md:rounded-2xl border border-zinc-800/80 overflow-hidden relative shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={(instance) => {
          instanceRef.current = instance;
        }}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        minZoom={0.3}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={true}
        panOnScroll={false}
        zoomOnScroll={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="#27272a"
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          className="!m-3 !border-zinc-800 !bg-zinc-900/90 !backdrop-blur"
        />
      </ReactFlow>

      {/* Floating Canvas Hint */}
      <div className="absolute top-3 right-3 pointer-events-none bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Pan & Zoom enabled</span>
      </div>
    </div>
  );
};
