"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FlowType, PhaseConfig, CustomNodeType, CustomEdgeType } from "@/app/lib/types";

export type SpeedOption = 0.5 | 1 | 2;

export interface UseSimulationReturn {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: SpeedOption;
  flowType: FlowType;
  totalSteps: number;
  currentStep: PhaseConfig["flows"]["shorten"][number] | null;
  currentSteps: PhaseConfig["flows"]["shorten"];
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  play: () => void;
  pause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: SpeedOption) => void;
  setFlowType: (flow: FlowType) => void;
}

export function useSimulation(phaseConfig: PhaseConfig): UseSimulationReturn {
  const [flowType, setFlowTypeState] = useState<FlowType>("shorten");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SpeedOption>(1);

  const steps = useMemo(() => {
    return phaseConfig.flows[flowType] || [];
  }, [phaseConfig, flowType]);

  const totalSteps = steps.length;
  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] || null : null;

  // Reset step index and flow when phase changes
  useEffect(() => {
    setCurrentStepIndex(-1);
    setIsPlaying(false);
    setFlowTypeState("shorten");
  }, [phaseConfig.id]);

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
          // Finished flow
          setIsPlaying(false);
          return prev;
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
    setCurrentStepIndex((prev) => (prev < 0 ? 0 : prev + 1 < totalSteps ? prev + 1 : prev));
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

  const setFlowType = useCallback((flow: FlowType) => {
    setFlowTypeState(flow);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  }, []);

  // Compute active state on nodes and edges
  const nodes = useMemo(() => {
    const activeNodes = currentStep?.activeNodeIds || [];
    const statusMsgs = currentStep?.nodeStatusMessages || {};

    return phaseConfig.nodes.map((node) => {
      const isActive = activeNodes.includes(node.id);
      const statusMessage = statusMsgs[node.id];

      return {
        ...node,
        data: {
          ...node.data,
          isActive,
          statusMessage,
        },
      };
    });
  }, [phaseConfig.nodes, currentStep]);

  const edges = useMemo(() => {
    const activeEdges = currentStep?.activeEdgeIds || [];

    return phaseConfig.edges.map((edge) => {
      const isActive = activeEdges.includes(edge.id);
      return {
        ...edge,
        data: {
          ...edge.data,
          isActive,
        },
      };
    });
  }, [phaseConfig.edges, currentStep]);

  return {
    currentStepIndex,
    isPlaying,
    speed,
    flowType,
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
