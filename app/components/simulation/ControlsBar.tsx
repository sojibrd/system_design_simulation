"use client";

import React from "react";
import { FlowType } from "@/app/lib/types";
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
} from "lucide-react";

interface ControlsBarProps {
  isPlaying: boolean;
  speed: SpeedOption;
  flowType: FlowType;
  currentStepIndex: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: SpeedOption) => void;
  onFlowChange: (flow: FlowType) => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isPlaying,
  speed,
  flowType,
  currentStepIndex,
  totalSteps,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onFlowChange,
}) => {
  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
      {/* 1. Flow Type Switcher (Shorten vs Redirect) */}
      <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
        <button
          onClick={() => onFlowChange("shorten")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            flowType === "shorten"
              ? "bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>Shorten (লিংক তৈরি)</span>
        </button>

        <button
          onClick={() => onFlowChange("redirect")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            flowType === "redirect"
              ? "bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <CornerUpRight className="w-3.5 h-3.5" />
          <span>Redirect (রিডাইরেক্ট)</span>
        </button>
      </div>

      {/* 2. Main Playback Controls */}
      <div className="flex items-center gap-2">
        {/* Reset button */}
        <button
          onClick={onReset}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
          title="শুরু থেকে আবার দেখুন (Reset)"
          aria-label="Reset simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Previous Step */}
        <button
          onClick={onPrev}
          disabled={currentStepIndex === 0}
          className="p-2 rounded-xl text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="আগের ধাপ (Previous Step)"
          aria-label="Previous step"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Play / Pause Toggle Button */}
        {isPlaying ? (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs md:text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            aria-label="Pause simulation"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>Pause (বিরতি)</span>
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-zinc-950 font-bold text-xs md:text-sm shadow-lg shadow-cyan-500/30 transition-all transform active:scale-95 animate-pulse"
            aria-label="Simulate flow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Simulate (সিমুলেট করুন)</span>
          </button>
        )}

        {/* Next Step */}
        <button
          onClick={onNext}
          disabled={currentStepIndex >= totalSteps - 1}
          className="p-2 rounded-xl text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="পরের ধাপ (Next Step)"
          aria-label="Next step"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Speed Multiplier Selection */}
      <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800 text-xs">
        <Gauge className="w-3.5 h-3.5 text-zinc-500 ml-1 shrink-0" />
        <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">Speed:</span>

        {([0.5, 1, 2] as SpeedOption[]).map((val) => (
          <button
            key={val}
            onClick={() => onSpeedChange(val)}
            className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all ${
              speed === val
                ? "bg-zinc-800 text-cyan-300 font-bold border border-zinc-700"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {val}x
          </button>
        ))}
      </div>
    </div>
  );
};
