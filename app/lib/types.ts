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

/**
 * Which scenario a flow depicts. Cache hit and cache miss are ALTERNATIVES to
 * each other, not consecutive moments, so each gets its own timeline instead of
 * being spliced into one.
 */
export type FlowKind =
  | "shorten"
  | "redirect"
  | "redirect-miss"
  | "failover"
  | "analytics";

/** Name of a lucide icon the controls bar renders for a flow. */
export type FlowIcon = "link" | "redirect" | "miss" | "failover" | "analytics";

export interface FlowDefinition {
  id: FlowKind;
  /** Short label on the flow selector button. */
  name: string;
  icon: FlowIcon;
  steps: SimulationStep[];
}

export interface SimulationStep {
  id: string;
  flowType: FlowKind;
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

/**
 * The back-of-the-envelope numbers this phase is sized for. These are what
 * justify the component count — without them each tier looks like an arbitrary
 * pile of boxes.
 */
export interface ScaleEstimate {
  /** e.g. "১০০ writes/sec" */
  writeQps: string;
  readQps: string;
  /** e.g. "১০০ : ১" */
  readWriteRatio: string;
  /** Storage needed after five years. */
  storage5y: string;
  /** Short code length and the keyspace it buys. */
  codeLength: string;
}

/**
 * A decision that shaped this architecture but has no hop to animate — the
 * "why", as opposed to the "what happens".
 */
export interface TradeOff {
  /** The question being settled, e.g. "301 না 302?" */
  question: string;
  options: { name: string; note: string }[];
  /** Which option this phase takes, and why. */
  chosen: string;
  why: string;
}

export interface PhaseConfig {
  id: PhaseId;
  name: string;
  badge: string;
  tagline: string;
  componentCount: number;
  conceptSummary: string;
  keyConcepts: string[];
  scaleEstimate?: ScaleEstimate;
  tradeOffs?: TradeOff[];
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  /** First entry is the flow selected when the phase opens. */
  flows: FlowDefinition[];
}
