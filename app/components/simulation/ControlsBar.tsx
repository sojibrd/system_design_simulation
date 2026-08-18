"use client";

import React from "react";
import { FlowKind, FlowDefinition, FlowIcon } from "@/app/lib/types";
import { SpeedOption } from "@/app/hooks/useSimulation";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  Link,
  CornerUpRight,
  PanelRight,
  SearchX,
  ShieldAlert,
  BarChart3,
  type LucideIcon,
  PanelRightClose,
} from "lucide-react";
import { Button, IconButton, Panel } from "@/app/components/ui";

/** Flow definitions name an icon; the controls bar owns the mapping. */
const flowIcons: Record<FlowIcon, LucideIcon> = {
  link: Link,
  redirect: CornerUpRight,
  miss: SearchX,
  failover: ShieldAlert,
  analytics: BarChart3,
};

interface ControlsBarProps {
  isPlaying: boolean;
  speed: SpeedOption;
  flowType: FlowKind;
  availableFlows: FlowDefinition[];
  currentStepIndex: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: SpeedOption) => void;
  onFlowChange: (flow: FlowKind) => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isPlaying,
  speed,
  flowType,
  availableFlows,
  currentStepIndex,
  totalSteps,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onFlowChange,
  isPanelOpen,
  onTogglePanel,
}) => {
  return (
    <Panel className="w-full p-2.5 md:p-3 overflow-x-auto">
      {/* One row from `sm` up. On a phone it wraps into two: playback alone on
          the first row where the thumb reaches, everything else below. */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 sm:gap-3">
        {/* 1. Flow selector — built from what the phase declares, so a tier can
               offer a cache-miss or failover scenario without touching this file */}
        <div className="sm:flex-1 flex items-center justify-center sm:justify-start min-w-0">
          <div className="segment-group max-w-full overflow-x-auto">
            {availableFlows.map((flow) => {
              const Icon = flowIcons[flow.icon];
              return (
                <button
                  key={flow.id}
                  type="button"
                  onClick={() => onFlowChange(flow.id)}
                  aria-pressed={flowType === flow.id}
                  className="segment text-xs shrink-0 min-h-10 sm:min-h-0"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{flow.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Playback — dead centre on desktop, its own row on a phone */}
        <div className="shrink-0 flex items-center justify-center gap-2">
          <IconButton
            variant="ghost"
            onClick={onReset}
            title="Reset"
            aria-label="Reset simulation"
            className="min-w-11 min-h-11 sm:min-w-0 sm:min-h-0"
          >
            <RotateCcw className="w-4 h-4" />
          </IconButton>

          <IconButton
            onClick={onPrev}
            disabled={currentStepIndex < 0}
            title="Previous step"
            aria-label="Previous step"
            className="min-w-11 min-h-11 sm:min-w-0 sm:min-h-0"
          >
            <SkipBack className="w-4 h-4" />
          </IconButton>

          {isPlaying ? (
            <Button
              variant="alert"
              onClick={onPause}
              aria-label="Pause simulation"
              className="flex-1 sm:flex-none min-h-11 sm:min-h-0"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={onPlay}
              aria-label="Simulate flow"
              className="flex-1 sm:flex-none min-h-11 sm:min-h-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Simulate</span>
            </Button>
          )}

          <IconButton
            onClick={onNext}
            disabled={totalSteps === 0}
            title="Next step"
            aria-label="Next step"
            className="min-w-11 min-h-11 sm:min-w-0 sm:min-h-0"
          >
            <SkipForward className="w-4 h-4" />
          </IconButton>
        </div>

        {/* 3. Speed & panel toggle — mirrors the left side's flex weight */}
        <div className="sm:flex-1 flex items-center justify-center sm:justify-end gap-2">
          <div className="segment-group px-2 py-1 gap-1">
            <Gauge className="t-muted w-3.5 h-3.5 shrink-0" />
            <span className="t-label hidden md:inline mr-1">Speed</span>

            {([0.5, 1, 2] as SpeedOption[]).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onSpeedChange(val)}
                aria-pressed={speed === val}
                className="segment t-mono px-2 py-1 sm:px-1.5 sm:py-0.5 text-[11px]"
              >
                {val}x
              </button>
            ))}
          </div>

          <Button
            variant={isPanelOpen ? "primary" : "outline"}
            onClick={onTogglePanel}
            className="px-3! py-2! text-xs! shrink-0 min-h-10 sm:min-h-0"
            title={isPanelOpen ? "Hide steps panel (full-width diagram)" : "Show steps panel"}
            aria-pressed={isPanelOpen}
            aria-label="Toggle step walkthrough panel"
          >
            {isPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
            <span className="hidden sm:inline">Steps</span>
          </Button>
        </div>
      </div>
    </Panel>
  );
};
