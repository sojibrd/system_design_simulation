"use client";

import React from "react";
import { LevelId, LevelConfig } from "@/app/lib/types";
import { Layers } from "lucide-react";

export const LevelTabs: React.FC<{
  currentLevelId: LevelId;
  levels: LevelConfig[];
  onSelectLevel: (levelId: LevelId) => void;
}> = ({ currentLevelId, levels, onSelectLevel }) => {
  return (
    /* Revision tabs — the drafts of the same system, A / B / C. The level
       tagline used to sit under these in its own row; it now shares the design
       notes row below, which was carrying a static subtitle anyway. */
    <div className="grid grid-cols-3 gap-2 w-full">
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
  );
};
