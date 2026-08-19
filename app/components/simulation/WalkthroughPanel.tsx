"use client";

import React, { useState, useEffect, useRef } from "react";
import { FlowKind, SimulationStep } from "@/app/lib/types";
import {
  BookOpen,
  Code2,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Lightbulb,
  Play,
  X,
} from "lucide-react";
import { Badge, Callout, IconButton, Panel } from "@/app/components/ui";

/** Which scenario the current step belongs to, shown beside the step counter. */
const flowBadge: Record<FlowKind, string> = {
  shorten: "SHORTEN",
  redirect: "REDIRECT · HIT",
  "redirect-miss": "REDIRECT · MISS",
  failover: "FAILOVER",
  analytics: "ANALYTICS",
};

interface WalkthroughPanelProps {
  currentStep: SimulationStep | null;
  currentStepIndex: number;
  totalSteps: number;
  steps: SimulationStep[];
  onSelectStep: (index: number) => void;
  /** Flow has run to the end — freeze the live indicators. */
  isFinished?: boolean;
  /** Dismisses the sheet. Only acted on for phones, where it overlays the canvas. */
  onClose?: () => void;
}

const stepNo = (idx: number) => String(idx + 1).padStart(2, "0");

export const WalkthroughPanel: React.FC<WalkthroughPanelProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  steps,
  onSelectStep,
  isFinished = false,
  onClose,
}) => {
  const [showPayload, setShowPayload] = useState<boolean>(true);
  // The panel shows one thing at a time: the current step, or the whole log.
  const [mode, setMode] = useState<"step" | "log">("log");
  const bodyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll body to top on step change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStepIndex]);

  // The log has to follow the run: on a long scenario the current row would
  // otherwise scroll out of sight while the animation carries on without it.
  useEffect(() => {
    if (mode !== "log") return;
    const row = logRef.current?.querySelector('[aria-current="true"]');
    row?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentStepIndex, mode]);

  // This flow has nothing to walk through. Only reachable if a data file
  // declares a flow with an empty `steps` array — without this the reader
  // would just press Simulate and watch nothing happen, twice.
  if (totalSteps === 0) {
    return (
      <Panel className="flex flex-col h-full items-center justify-center p-4 sm:p-6 text-center gap-3">
        <div className="surface-well t-muted w-14 h-14 flex items-center justify-center">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h3 className="t-title text-sm">এই flow-টি এখনো লেখা হয়নি</h3>
        <p className="t-body text-xs max-w-[240px] mx-auto">
          উপরের অন্য কোনো scenario বেছে নিন, অথবা অন্য একটা লেভেলে যান।
        </p>
      </Panel>
    );
  }

  // Placeholder when no step is selected yet (before simulation starts)
  if (!currentStep) {
    return (
      <Panel className="flex flex-col h-full items-center justify-center p-4 sm:p-6 text-center gap-4">
        <div className="surface-well t-accent w-14 h-14 flex items-center justify-center">
          <Play className="w-6 h-6" />
        </div>
        <div>
          <h3 className="t-title text-sm mb-1.5">সিমুলেশন শুরু করুন</h3>
          <p className="t-body text-xs max-w-[220px] mx-auto">
            নিচের <strong className="t-strong">Simulate</strong> বাটনে ক্লিক করুন এবং দেখুন
            ডাটা কীভাবে প্রবাহিত হয়।
          </p>
        </div>
        <div className="t-caption flex items-center gap-2">
          <Badge>Shorten</Badge>
          <span>বা</span>
          <Badge>Redirect</Badge>
          <span>বেছে নিন</span>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="flex flex-col h-full p-3 sm:p-4 md:p-5 overflow-hidden">
      {/* Title block of the note sheet */}
      <div className="flex items-center justify-between gap-2 pb-2 seam-b-heavy">
        <div className="flex items-center gap-2 min-w-0">
          <span className="t-mono t-strong text-xs">
            STEP {stepNo(currentStepIndex)} / {String(totalSteps).padStart(2, "0")}
          </span>
          <Badge tone="accent">
            {flowBadge[currentStep.flowType]}
          </Badge>
        </div>

        {/* Two modes rather than an accordion: the step list used to open
            between the header and the body, hiding the very explanation it is
            meant to complement. */}
        <div className="segment-group shrink-0">
          <button
            type="button"
            onClick={() => setMode("step")}
            aria-pressed={mode === "step"}
            className="segment t-label px-2 py-1"
            title="বর্তমান ধাপের ব্যাখ্যা"
          >
            Step
          </button>
          <button
            type="button"
            onClick={() => setMode("log")}
            aria-pressed={mode === "log"}
            className="segment t-label px-2 py-1"
            title="সব ধাপের তালিকা"
          >
            Log ({totalSteps})
          </button>
        </div>

        {/* Phones only — on a wide screen the panel is a column, not an overlay. */}
        {onClose && (
          <IconButton
            variant="ghost"
            onClick={onClose}
            aria-label="Close walkthrough"
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </IconButton>
        )}
      </div>

      {/* LOG — the whole scenario at a glance. This is the one thing the
          progress ruler cannot give: the story, not just the position. */}
      {mode === "log" && (
        <div
          ref={logRef}
          className="surface-well flex-1 min-h-0 my-2 p-1.5 overflow-y-auto"
        >
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  onSelectStep(idx);
                  setMode("step");
                }}
                aria-current={isCurrent}
                className="row w-full text-left px-2 py-1.5 text-xs flex items-center gap-2"
              >
                {isCompleted ? (
                  <CheckCircle2 className="t-ok w-3.5 h-3.5 shrink-0" />
                ) : (
                  <span className="t-mono text-[10px] w-3.5 shrink-0">{stepNo(idx)}</span>
                )}
                <span className="truncate flex-1">{step.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* STEP — the current step in full */}
      <div
        ref={bodyRef}
        hidden={mode !== "step"}
        className="flex-1 overflow-y-auto py-3 space-y-3 pr-1"
      >
        <h3 className="t-title text-sm md:text-base leading-snug">
          {currentStep.title}
        </h3>

        <Callout label="কী ঘটছে / What happens" icon={<BookOpen className="w-3.5 h-3.5" />}>
          {currentStep.whatHappens}
        </Callout>

        {currentStep.analogy && (
          <Callout
            label="সহজ উপমা / Analogy"
            tone="accent"
            icon={<Lightbulb className="w-3.5 h-3.5" />}
          >
            <span className="t-quote">{currentStep.analogy}</span>
          </Callout>
        )}

        <Callout
          label="কেন এভাবে / Technical depth"
          icon={<HelpCircle className="w-3.5 h-3.5" />}
        >
          <span className="t-muted">{currentStep.whyItMatters}</span>
        </Callout>

        {currentStep.payloadSnippet && (
          <div className="surface-well overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPayload((prev) => !prev)}
              className="row w-full px-2.5 py-1.5 seam-b flex items-center justify-between"
            >
              <span className="t-label flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Request / Query payload
              </span>
              <span className="t-mono text-[10px]">{showPayload ? "▲" : "▼"}</span>
            </button>

            {showPayload && (
              <pre className="payload p-3 text-[11px] overflow-x-auto">
                <code>{currentStep.payloadSnippet}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Progress ruler at the bottom */}
      <div className="pt-2 seam-t flex flex-wrap items-end justify-center gap-1">
        {steps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectStep(idx)}
            data-state={
              idx === currentStepIndex ? "current" : idx < currentStepIndex ? "done" : "todo"
            }
            data-live={!isFinished}
            className="progress-mark"
            title={`Go to Step ${idx + 1}`}
          />
        ))}
      </div>
    </Panel>
  );
};
