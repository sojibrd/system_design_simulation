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

/** A segmented switch drawn as two ruled cells, not a pill. */
const segment = (selected: boolean) =>
  `flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
    selected
      ? "bg-lamp text-chassis"
      : "text-readout-muted hover:text-readout hover:bg-panel-hi"
  }`;

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
      <div className="flex items-center gap-3 min-w-[560px]">
        {/* 1. Flow selector — built from what the phase declares, so a tier can
               offer a cache-miss or failover scenario without touching this file */}
        <div className="flex-1 flex items-center justify-start">
          <div className="flex items-center rounded-box border border-bezel-strong overflow-hidden divide-x divide-bezel-strong">
            {availableFlows.map((flow) => {
              const Icon = flowIcons[flow.icon];
              return (
                <button
                  key={flow.id}
                  type="button"
                  onClick={() => onFlowChange(flow.id)}
                  className={segment(flowType === flow.id)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{flow.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Playback — always dead centre of the bar */}
        <div className="shrink-0 flex items-center gap-2">
          <IconButton variant="ghost" onClick={onReset} title="Reset" aria-label="Reset simulation">
            <RotateCcw className="w-4 h-4" />
          </IconButton>

          <IconButton
            onClick={onPrev}
            disabled={currentStepIndex < 0}
            title="Previous step"
            aria-label="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </IconButton>

          {isPlaying ? (
            <Button variant="alert" onClick={onPause} aria-label="Pause simulation">
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </Button>
          ) : (
            <Button variant="primary" onClick={onPlay} aria-label="Simulate flow">
              <Play className="w-4 h-4 fill-current" />
              <span>Simulate</span>
            </Button>
          )}

          <IconButton
            onClick={onNext}
            disabled={totalSteps === 0}
            title="Next step"
            aria-label="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </IconButton>
        </div>

        {/* 3. Speed & panel toggle — mirrors the left side's flex weight */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="flex items-center gap-1 rounded-box border border-bezel-strong px-2 py-1">
            <Gauge className="w-3.5 h-3.5 text-readout-faint shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-readout-faint hidden sm:inline mr-1">
              Speed
            </span>

            {([0.5, 1, 2] as SpeedOption[]).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onSpeedChange(val)}
                className={`px-1.5 py-0.5 rounded-tick font-mono text-[11px] transition-colors ${
                  speed === val
                    ? "bg-lamp text-chassis font-bold"
                    : "text-readout-muted hover:text-readout hover:bg-panel-hi"
                }`}
              >
                {val}x
              </button>
            ))}
          </div>

          <Button
            variant={isPanelOpen ? "primary" : "outline"}
            onClick={onTogglePanel}
            className="!px-3 !py-2 !text-xs shrink-0"
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
