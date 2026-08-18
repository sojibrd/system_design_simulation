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
    <div className="w-full h-full min-h-0 bg-paper-raised rounded-sheet border border-rule-strong overflow-hidden relative shadow-sheet">
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
        {/* Graph paper: a fine grid with a heavier one every fifth line. */}
        <Background
          id="minor"
          variant={BackgroundVariant.Lines}
          gap={16}
          lineWidth={1}
          color="var(--color-grid-minor)"
        />
        <Background
          id="major"
          variant={BackgroundVariant.Lines}
          gap={80}
          lineWidth={1}
          color="var(--color-grid-major)"
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          className="!m-3 !border-rule !bg-paper-raised"
        />
      </ReactFlow>

      {/* Floating Canvas Hint */}
      <div className="absolute top-3 right-3 pointer-events-none bg-paper-raised px-2 py-0.5 rounded-tick border border-rule font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-confirm"></span>
        <span>Pan &amp; Zoom</span>
      </div>
    </div>
  );
};
