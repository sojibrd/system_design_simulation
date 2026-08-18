"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FlowKind,
  FlowDefinition,
  PhaseConfig,
  CustomNodeType,
  CustomEdgeType,
  PhaseId,
  SimulationStep,
} from "@/app/lib/types";

export type SpeedOption = 0.5 | 1 | 2;

export interface UseSimulationReturn {
  currentStepIndex: number;
  isPlaying: boolean;
  isFinished: boolean;
  speed: SpeedOption;
  flowType: FlowKind;
  /** The flows this phase declares, in selector order. */
  availableFlows: FlowDefinition[];
  totalSteps: number;
  currentStep: SimulationStep | null;
  currentSteps: SimulationStep[];
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  play: () => void;
  pause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: SpeedOption) => void;
  setFlowType: (flow: FlowKind) => void;
}

export function useSimulation(phaseConfig: PhaseConfig): UseSimulationReturn {
  const [flowType, setFlowTypeState] = useState<FlowKind>(
    phaseConfig.flows[0].id
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SpeedOption>(1);

  // A phase only declares the flows that make sense for it — beginner has no
  // cache, so it has no cache-miss flow. Falling back to the first flow keeps
  // the selector honest when switching between phases.
  const steps = useMemo(() => {
    const flow =
      phaseConfig.flows.find((f) => f.id === flowType) ?? phaseConfig.flows[0];
    return flow?.steps ?? [];
  }, [phaseConfig, flowType]);

  const totalSteps = steps.length;
  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] || null : null;

  // Sitting on the last step with playback stopped means the flow is done —
  // the diagram keeps its highlight but all motion is switched off.
  const isFinished =
    !isPlaying && totalSteps > 0 && currentStepIndex === totalSteps - 1;

  // Switching phase starts a fresh simulation: back to the first flow, before
  // step one, paused. Adjusted during render rather than in an effect so the
  // diagram never paints one frame of the old phase's state.
  const [lastPhaseId, setLastPhaseId] = useState<PhaseId>(phaseConfig.id);
  if (lastPhaseId !== phaseConfig.id) {
    setLastPhaseId(phaseConfig.id);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
    setFlowTypeState(phaseConfig.flows[0].id);
  }

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const baseDelay = 3200; // ms per step
    const delay = baseDelay / speed;

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        if (prev + 1 < totalSteps) {
          return prev + 1;
        } else {
          // Finished flow — reset to initial state (-1) so diagram matches before-starting situation
          setIsPlaying(false);
          return -1;
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, totalSteps, speed]);

  const play = useCallback(() => {
    if (currentStepIndex < 0 || currentStepIndex >= totalSteps - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, totalSteps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const nextStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev < 0 ? 0 : prev + 1 < totalSteps ? prev + 1 : -1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : -1));
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      setIsPlaying(false);
      if (index >= 0 && index < totalSteps) {
        setCurrentStepIndex(index);
      }
    },
    [totalSteps]
  );

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
  }, []);

  const setFlowType = useCallback((flow: FlowKind) => {
    setFlowTypeState(flow);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  }, []);

  // Compute active state on nodes and edges
  const nodes = useMemo(() => {
    const activeNodes = currentStep?.activeNodeIds || [];
    const focusedNodeId = activeNodes[0];
    const statusMsgs = currentStep?.nodeStatusMessages || {};

    return phaseConfig.nodes.map((node) => {
      const isActive = activeNodes.includes(node.id);
      const isFocused = node.id === focusedNodeId;
      const statusMessage = statusMsgs[node.id];

      return {
        ...node,
        data: {
          ...node.data,
          isActive,
          isFocused,
          isAnimated: isActive && !isFinished,
          statusMessage,
        },
      };
    });
  }, [phaseConfig.nodes, currentStep, isFinished]);

  const edges = useMemo(() => {
    const activeEdges = currentStep?.activeEdgeIds || [];
    const edgeOverrides = currentStep?.edgeOverrides || {};

    return phaseConfig.edges.map((edge) => {
      const isActive = activeEdges.includes(edge.id);
      const override = edgeOverrides[edge.id] || {};
      return {
        ...edge,
        data: {
          ...edge.data,
          isActive,
          isAnimated: isActive && !isFinished,
          ...override,
        },
      };
    });
  }, [phaseConfig.edges, currentStep, isFinished]);

  return {
    currentStepIndex,
    isPlaying,
    isFinished,
    speed,
    flowType,
    availableFlows: phaseConfig.flows,
    totalSteps,
    currentStep,
    currentSteps: steps,
    nodes,
    edges,
    play,
    pause,
    nextStep,
    prevStep,
    goToStep,
    reset,
    setSpeed,
    setFlowType,
  };
}
