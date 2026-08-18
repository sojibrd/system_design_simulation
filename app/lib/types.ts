import type { Node, Edge } from "@xyflow/react";

export type ComponentCategory =
  | "client"
  | "compute"
  | "storage"
  | "network"
  | "queue"
  | "security"
  | "analytics";

export interface SimulationNodeData extends Record<string, unknown> {
  label: string;
  subLabel?: string;
  category: ComponentCategory;
  emoji: string;
  analogy: string;
  description: string;
  techSpecs?: string;
  isActive?: boolean;
  isFocused?: boolean;
  /** False once the flow has finished — highlight stays, motion stops. */
  isAnimated?: boolean;
  statusMessage?: string;
}

/**
 * Semantic name for the ink a flowing packet is drawn in. Data files name the
 * MEANING of a hop; `AnimatedEdge` resolves it to a token colour.
 */
export type SignalKind =
  | "request"
  | "write"
  | "read"
  | "success"
  | "cache"
  | "event"
  | "error"
  | "meta";

export interface SimulationEdgeData extends Record<string, unknown> {
  label?: string;
  isActive?: boolean;
  /** False once the flow has finished — highlight stays, motion stops. */
  isAnimated?: boolean;
  isReverse?: boolean;
  particleColor?: SignalKind;
  highlightText?: string;
}

export type CustomNodeType = Node<SimulationNodeData, "simulationNode">;
export type CustomEdgeType = Edge<SimulationEdgeData, "animatedFlowEdge">;

export type FlowType = "shorten" | "redirect";

export interface SimulationStep {
  id: string;
  flowType: FlowType;
  stepNumber: number;
  title: string;
  whatHappens: string; // Kid-friendly bold summary in Bangla
  whyItMatters: string; // Technical reasoning
  analogy: string; // Real-world analogy with emoji
  activeNodeIds: string[];
  activeEdgeIds: string[];
  edgeOverrides?: Record<string, { label?: string; isReverse?: boolean; particleColor?: SignalKind }>;
  nodeStatusMessages?: Record<string, string>;
  payloadSnippet?: string;
}

export type PhaseId = "beginner" | "intermediate" | "expert";

export interface PhaseConfig {
  id: PhaseId;
  name: string;
  badge: string;
  tagline: string;
  componentCount: number;
  conceptSummary: string;
  keyConcepts: string[];
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  flows: {
    shorten: SimulationStep[];
    redirect: SimulationStep[];
  };
}
