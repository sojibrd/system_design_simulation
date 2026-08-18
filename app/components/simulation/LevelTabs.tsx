"use client";

import React from "react";
import { LevelId, LevelConfig } from "@/app/lib/types";
import { Layers } from "lucide-react";
import { Badge } from "@/app/components/ui";

export const LevelTabs: React.FC<{
  currentLevelId: LevelId;
  levels: LevelConfig[];
  onSelectLevel: (levelId: LevelId) => void;
}> = ({ currentLevelId, levels, onSelectLevel }) => {
  const active = levels.find((level) => level.id === currentLevelId);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Revision tabs — the three drafts of the same system, A / B / C. */}
      <div className="grid grid-cols-3 gap-2">
        {levels.map((level, index) => {
          const isSelected = level.id === currentLevelId;

          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectLevel(level.id)}
              aria-selected={isSelected}
              role="tab"
              className="tab relative min-h-11 sm:min-h-0 py-1.5 px-1.5 sm:px-2 md:px-4"
            >
              {/* On a phone only the level name survives — the ident and the
                  component count are context, not navigation. */}
              <span className="t-label hidden sm:inline">
                CFG {String.fromCharCode(65 + index)}
              </span>
              <span className="t-title text-xs md:text-sm truncate">
                {level.name}
              </span>
              <span className="t-label hidden md:flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {level.componentCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* The note attached to the selected configuration. */}
      {active && (
        <div className="callout callout--accent flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-xs">
          <div className="t-body flex items-center gap-2 min-w-0">
            <span className="t-label shrink-0">
              Note
            </span>
            <span className="truncate">{active.tagline}</span>
          </div>

          {/* Concept tags are supporting detail; a phone has no room for them
              beside the tagline. */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap">
            {active.keyConcepts.map((concept) => (
              <Badge key={concept}>{concept}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
