"use client";

import React, { useState } from "react";
import { PhaseConfig } from "@/app/lib/types";
import { ChevronDown, ChevronUp, Calculator, GitCompare } from "lucide-react";
import { Badge } from "@/app/components/ui";

/**
 * Phase-scoped reasoning: the numbers this tier is sized for, and the decisions
 * that have no hop to animate. Kept out of the walkthrough panel because that
 * panel is step-scoped — it is replaced every time the step advances, while
 * these facts belong to the whole architecture.
 *
 * Collapsed by default: this is reading material, and the canvas needs the room.
 */
export const DesignNotes: React.FC<{ phase: PhaseConfig }> = ({ phase }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { scaleEstimate, tradeOffs } = phase;
  if (!scaleEstimate && !tradeOffs?.length) return null;

  const rows = scaleEstimate
    ? [
        { label: "Write QPS", value: scaleEstimate.writeQps },
        { label: "Read QPS", value: scaleEstimate.readQps },
        { label: "Read : Write", value: scaleEstimate.readWriteRatio },
        { label: "Storage (৫ বছর)", value: scaleEstimate.storage5y },
        { label: "Short code", value: scaleEstimate.codeLength },
      ]
    : [];

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-box border border-bezel bg-chassis hover:border-bezel-strong transition-colors"
      >
        <Calculator className="w-3.5 h-3.5 text-readout-faint shrink-0" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-readout-muted">
          Scale &amp; Trade-offs
        </span>
        <span className="text-xs text-readout-soft truncate hidden sm:inline">
          — এই কনফিগারেশন কোন সংখ্যার জন্য, আর কেন এই সিদ্ধান্তগুলো
        </span>
        <span className="ml-auto shrink-0 text-readout-faint">
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 max-h-[38vh] overflow-y-auto rounded-box border border-bezel bg-panel p-3 flex flex-col gap-4">
          {scaleEstimate && (
            <section>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-lamp mb-2">
                Capacity Estimate
              </h4>
              <dl className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-tick border border-bezel bg-well px-2 py-1.5"
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-readout-faint truncate">
                      {row.label}
                    </dt>
                    <dd className="text-xs text-readout font-semibold mt-0.5">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {tradeOffs && tradeOffs.length > 0 && (
            <section>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-lamp mb-2 flex items-center gap-1.5">
                <GitCompare className="w-3 h-3" />
                Design Trade-offs
              </h4>
              <div className="flex flex-col gap-3">
                {tradeOffs.map((tradeOff) => (
                  <article
                    key={tradeOff.question}
                    className="rounded-tick border border-bezel bg-well px-2.5 py-2"
                  >
                    <h5 className="text-xs font-bold text-readout mb-1.5">
                      {tradeOff.question}
                    </h5>

                    <ul className="flex flex-col gap-1 mb-2">
                      {tradeOff.options.map((option) => {
                        const isChosen = option.name === tradeOff.chosen;
                        return (
                          <li
                            key={option.name}
                            className={`text-[11px] leading-relaxed pl-2 border-l-2 ${
                              isChosen
                                ? "border-lamp text-readout-soft"
                                : "border-bezel-strong text-readout-muted"
                            }`}
                          >
                            <span className="font-mono font-semibold">
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

                    <p className="text-[11px] text-readout-soft leading-relaxed">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-lamp">
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
