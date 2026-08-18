"use client";

import React, { useState } from "react";
import { LevelConfig } from "@/app/lib/types";
import { ChevronDown, ChevronUp, Calculator, GitCompare } from "lucide-react";
import { Badge } from "@/app/components/ui";

/**
 * Level-scoped reasoning: the numbers this tier is sized for, and the decisions
 * that have no hop to animate. Kept out of the walkthrough panel because that
 * panel is step-scoped — it is replaced every time the step advances, while
 * these facts belong to the whole architecture.
 *
 * Collapsed by default: this is reading material, and the canvas needs the room.
 */
export const DesignNotes: React.FC<{ level: LevelConfig }> = ({ level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { scaleEstimate, tradeOffs } = level;
  if (!scaleEstimate && !tradeOffs?.length) return null;

  // Four universal figures, then whatever this particular system also needs.
  const rows = scaleEstimate
    ? [
        { label: "Write QPS", value: scaleEstimate.writeQps },
        { label: "Read QPS", value: scaleEstimate.readQps },
        { label: "Read : Write", value: scaleEstimate.readWriteRatio },
        { label: "Storage (৫ বছর)", value: scaleEstimate.storage5y },
        ...(scaleEstimate.extras ?? []),
      ]
    : [];

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="control w-full justify-start gap-2 px-3 py-1.5 min-h-10 sm:min-h-0"
      >
        <Calculator className="t-muted w-3.5 h-3.5 shrink-0" />
        <span className="t-label">
          Scale &amp; Trade-offs
        </span>
        <span className="t-body text-xs truncate hidden sm:inline normal-case">
          — এই কনফিগারেশন কোন সংখ্যার জন্য, আর কেন এই সিদ্ধান্তগুলো
        </span>
        <span className="t-muted ml-auto shrink-0">
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="surface-panel mt-2 max-h-[38vh] overflow-y-auto p-3 flex flex-col gap-4">
          {scaleEstimate && (
            <section>
              <h4 className="t-label t-accent mb-2">
                Capacity Estimate
              </h4>
              <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="surface-well px-2 py-1.5"
                  >
                    <dt className="t-label truncate">
                      {row.label}
                    </dt>
                    <dd className="t-title text-xs mt-0.5">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {tradeOffs && tradeOffs.length > 0 && (
            <section>
              <h4 className="t-label t-accent mb-2 flex items-center gap-1.5">
                <GitCompare className="w-3 h-3" />
                Design Trade-offs
              </h4>
              <div className="flex flex-col gap-3">
                {tradeOffs.map((tradeOff) => (
                  <article
                    key={tradeOff.question}
                    className="surface-well px-2.5 py-2"
                  >
                    <h5 className="t-title text-xs mb-1.5">
                      {tradeOff.question}
                    </h5>

                    <ul className="flex flex-col gap-1 mb-2">
                      {tradeOff.options.map((option) => {
                        const isChosen = option.name === tradeOff.chosen;
                        return (
                          <li
                            key={option.name}
                            className={`t-body text-[11px] pl-2 border-l-2 ${
                              isChosen ? "t-body" : "t-muted"
                            }`}
                            style={{
                              borderColor: isChosen
                                ? "var(--t-accent)"
                                : "var(--t-seam)",
                            }}
                          >
                            <span className="t-mono t-strong">
                              {option.name}
                            </span>
                            {isChosen && (
                              <span className="ml-1.5">
                                <Badge tone="confirm">এই ধাপে নির্বাচিত</Badge>
                              </span>
                            )}
                            <span> — {option.note}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <p className="t-body text-[11px]">
                      <span className="t-label t-accent">
                        কেন:{" "}
                      </span>
                      {tradeOff.why}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
