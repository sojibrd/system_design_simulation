"use client";

import React from "react";
import { PhaseId, PhaseConfig } from "@/app/lib/types";
import { Layers } from "lucide-react";
import { Badge } from "@/app/components/ui";

export const PhaseTabs: React.FC<{
  currentPhaseId: PhaseId;
  phases: PhaseConfig[];
  onSelectPhase: (phaseId: PhaseId) => void;
}> = ({ currentPhaseId, phases, onSelectPhase }) => {
  const active = phases.find((phase) => phase.id === currentPhaseId);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Revision tabs — the three drafts of the same system, A / B / C. */}
      <div className="grid grid-cols-3 gap-2">
        {phases.map((phase, index) => {
          const isSelected = phase.id === currentPhaseId;

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => onSelectPhase(phase.id)}
              className={`relative flex items-center justify-center gap-2 py-1.5 px-2 md:px-4 rounded-box border transition-all duration-200 ease-plot ${
                isSelected
                  ? "bg-paper-raised border-ink border-b-2 text-ink shadow-drawn"
                  : "bg-paper border-rule text-ink-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">
                REV {String.fromCharCode(65 + index)}
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-tight">
                {phase.name}
              </span>
              <span className="hidden md:flex items-center gap-1 font-mono text-[10px] text-ink-muted">
                <Layers className="w-3 h-3" />
                {phase.componentCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Revision note for the selected draft. */}
      {active && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 border-l-2 border-accent bg-accent-soft/50 rounded-r-box text-xs">
          <div className="flex items-center gap-2 text-ink-soft min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent shrink-0">
              Note
            </span>
            <span className="truncate">{active.tagline}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {active.keyConcepts.map((concept) => (
              <Badge key={concept}>{concept}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
