"use client";

import React from "react";
import { PhaseId, PhaseConfig } from "@/app/lib/types";
import { Sparkles, Layers } from "lucide-react";

interface PhaseTabsProps {
  currentPhaseId: PhaseId;
  phases: PhaseConfig[];
  onSelectPhase: (phaseId: PhaseId) => void;
}

export const PhaseTabs: React.FC<PhaseTabsProps> = ({
  currentPhaseId,
  phases,
  onSelectPhase,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* Tab Buttons */}
      <div className="grid grid-cols-3 gap-2 bg-zinc-950/80 p-1.5 rounded-2xl border border-zinc-800/90 shadow-lg backdrop-blur">
        {phases.map((phase) => {
          const isSelected = phase.id === currentPhaseId;

          return (
            <button
              key={phase.id}
              onClick={() => onSelectPhase(phase.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-2 md:px-4 rounded-xl transition-all duration-300 text-center ${
                isSelected
                  ? "bg-zinc-900 border border-cyan-500/50 shadow-md shadow-cyan-500/10 text-zinc-50 font-bold scale-[1.02]"
                  : "hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs md:text-sm">{phase.badge.split(" ")[0]}</span>
                <span className="text-xs md:text-sm tracking-tight">{phase.name}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Layers className="w-3 h-3 text-cyan-400/80" />
                <span>{phase.componentCount} Components</span>
              </div>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Phase Tagline & Key Highlights */}
      {phases.map((phase) => {
        if (phase.id !== currentPhaseId) return null;

        return (
          <div
            key={phase.id}
            className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-xs"
          >
            <div className="flex items-center gap-2 text-zinc-300 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium truncate">{phase.tagline}</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {phase.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50 font-mono"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
