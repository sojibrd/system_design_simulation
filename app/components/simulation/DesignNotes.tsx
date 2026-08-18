"use client";

import React, { useState } from "react";
import { LevelConfig } from "@/app/lib/types";
import {
  ChevronDown,
  ChevronUp,
  Calculator,
  GitCompare,
  Lightbulb,
} from "lucide-react";
import { Badge } from "@/app/components/ui";

/**
 * Everything that describes the LEVEL rather than the current step: what this
 * tier is, the concepts it introduces, the numbers it is sized for, and the
 * decisions that have no hop to animate. Kept out of the walkthrough panel
 * because that panel is step-scoped — it is replaced every time the step
 * advances, while these facts belong to the whole architecture.
 *
 * This row also carries the level tagline. It used to have its own callout
 * above, which cost a full row (two on a wide screen, once the concept tags
 * wrapped) to say the same kind of thing this row was already saying with a
 * static subtitle. One row, one job.
 *
 * The body is collapsed by default: it is reading material, and the canvas
 * needs the room.
 */
export const DesignNotes: React.FC<{ level: LevelConfig }> = ({ level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { scaleEstimate, tradeOffs, keyConcepts, tagline } = level;
  // The tagline alone is not worth a disclosure — without a body to open, the
  // row stays but stops pretending to be a button.
  const hasBody = Boolean(scaleEstimate || tradeOffs?.length || keyConcepts?.length);

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
      {/* One row: what this level is (tagline), and the way into everything
          else about it. */}
      <button
        type="button"
        onClick={() => hasBody && setIsOpen((open) => !open)}
        aria-expanded={hasBody ? isOpen : undefined}
        disabled={!hasBody}
        className="control w-full justify-start gap-2 px-3 py-1.5 min-h-10 sm:min-h-0 disabled:opacity-100"
      >
        <Calculator className="t-muted w-3.5 h-3.5 shrink-0" />
        <span className="t-label shrink-0">Note</span>
        <span className="t-body text-xs truncate normal-case">{tagline}</span>
        {hasBody && (
          <span className="t-muted ml-auto shrink-0">
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="surface-panel mt-2 max-h-[50dvh] sm:max-h-[38vh] overflow-y-auto p-3 flex flex-col gap-4">
          {/* Lightest first: what this tier introduces, before the numbers. */}
          {keyConcepts && keyConcepts.length > 0 && (
            <section>
              <h4 className="t-label t-accent mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3" />
                Key Concepts
              </h4>
              <div className="flex items-center gap-1.5 flex-wrap">
                {keyConcepts.map((concept) => (
                  <Badge key={concept}>{concept}</Badge>
                ))}
              </div>
            </section>
          )}

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
