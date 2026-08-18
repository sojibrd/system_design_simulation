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
import { Lamp } from "@/app/components/ui";
import { useThemeNumber } from "@/app/hooks/useThemeNumber";

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

  const canvasGap = useThemeNumber("--t-canvas-gap", 22);
  const canvasDotSize = useThemeNumber("--t-canvas-dot-size", 1);

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      animatedFlowEdge: AnimatedFlowEdge,
    }),
    []
  );

  return (
    <div className="surface-well w-full h-full min-h-0 overflow-hidden relative">
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
        {/* The backdrop the units sit on — the theme decides its texture. */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={canvasGap}
          size={canvasDotSize}
          color="var(--t-canvas-dot)"
        />
        <Controls showInteractive={false} position="bottom-left" className="!m-3" />
      </ReactFlow>

      {/* Floating Canvas Hint */}
      <div className="chip absolute top-3 right-3 pointer-events-none">
        <Lamp lit color="var(--t-ok)" />
        <span>Pan &amp; Zoom</span>
      </div>
    </div>
  );
};
