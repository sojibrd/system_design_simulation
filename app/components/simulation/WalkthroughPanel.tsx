"use client";

import React, { useState, useEffect, useRef } from "react";
import { SimulationStep } from "@/app/lib/types";
import {
  BookOpen,
  Code2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Play,
} from "lucide-react";
import { Badge, Callout, Panel } from "@/app/components/ui";

interface WalkthroughPanelProps {
  currentStep: SimulationStep | null;
  currentStepIndex: number;
  totalSteps: number;
  steps: SimulationStep[];
  onSelectStep: (index: number) => void;
  /** Flow has run to the end — freeze the live indicators. */
  isFinished?: boolean;
}

const stepNo = (idx: number) => String(idx + 1).padStart(2, "0");

export const WalkthroughPanel: React.FC<WalkthroughPanelProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  steps,
  onSelectStep,
  isFinished = false,
}) => {
  const [showPayload, setShowPayload] = useState<boolean>(true);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll body to top on step change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStepIndex]);

  // Placeholder when no step is selected yet (before simulation starts)
  if (!currentStep) {
    return (
      <Panel className="flex flex-col h-full items-center justify-center p-6 text-center gap-4">
        <div className="w-14 h-14 rounded-tick border border-ink bg-paper flex items-center justify-center">
          <Play className="w-6 h-6 text-ink" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ink mb-1.5">সিমুলেশন শুরু করুন</h3>
          <p className="text-xs text-ink-soft leading-relaxed max-w-[220px] mx-auto">
            নিচের <strong className="text-ink">Simulate</strong> বাটনে ক্লিক করুন এবং দেখুন
            ডাটা কীভাবে প্রবাহিত হয়।
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-ink-muted">
          <Badge>Shorten</Badge>
          <span>বা</span>
          <Badge>Redirect</Badge>
          <span>বেছে নিন</span>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="flex flex-col h-full p-4 md:p-5 overflow-hidden">
      {/* Title block of the note sheet */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-ink">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-bold text-ink">
            STEP {stepNo(currentStepIndex)} / {String(totalSteps).padStart(2, "0")}
          </span>
          <Badge tone="accent">
            {currentStep.flowType === "shorten" ? "SHORTEN" : "REDIRECT"}
          </Badge>
        </div>

        <button
          type="button"
          onClick={() => setShowAllSteps((prev) => !prev)}
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted hover:text-ink flex items-center gap-1 transition-colors px-1.5 py-1 rounded-tick hover:bg-paper-wash"
          title="সব ধাপের তালিকা দেখুন"
        >
          <span>Index ({totalSteps})</span>
          {showAllSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Index of every step on the sheet */}
      {showAllSteps && (
        <div className="my-2 p-1.5 bg-paper-sunken rounded-box border border-rule max-h-48 overflow-y-auto">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  onSelectStep(idx);
                  setShowAllSteps(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-tick text-xs flex items-center gap-2 transition-colors ${
                  isCurrent
                    ? "bg-ink text-paper font-semibold"
                    : isCompleted
                    ? "text-ink-soft hover:bg-paper-wash"
                    : "text-ink-muted hover:bg-paper-wash"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-confirm shrink-0" />
                ) : (
                  <span className="font-mono text-[10px] w-3.5 shrink-0">{stepNo(idx)}</span>
                )}
                <span className="truncate flex-1">{step.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Body of the note */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
        <h3 className="text-sm md:text-base font-bold text-ink leading-snug tracking-tight">
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
            <span className="italic">{currentStep.analogy}</span>
          </Callout>
        )}

        <Callout
          label="কেন এভাবে / Technical depth"
          icon={<HelpCircle className="w-3.5 h-3.5" />}
        >
          <span className="text-ink-muted">{currentStep.whyItMatters}</span>
        </Callout>

        {currentStep.payloadSnippet && (
          <div className="rounded-box border border-rule-strong overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPayload((prev) => !prev)}
              className="w-full px-2.5 py-1.5 bg-paper-wash border-b border-rule-strong flex items-center justify-between text-ink-muted hover:text-ink transition-colors"
            >
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]">
                <Code2 className="w-3.5 h-3.5" />
                Request / Query payload
              </span>
              <span className="font-mono text-[10px]">{showPayload ? "▲" : "▼"}</span>
            </button>

            {showPayload && (
              <pre className="p-3 text-[11px] font-mono text-ink overflow-x-auto leading-relaxed bg-paper-sunken">
                <code>{currentStep.payloadSnippet}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Progress ruler at the bottom */}
      <div className="pt-2 border-t border-rule flex flex-wrap items-end justify-center gap-1">
        {steps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectStep(idx)}
            className={`w-2 transition-all duration-200 ease-plot ${
              idx === currentStepIndex
                ? `h-4 bg-ink ${isFinished ? "" : "tick-sweep"}`
                : idx < currentStepIndex
                ? "h-3 bg-confirm"
                : "h-1.5 bg-rule-strong"
            }`}
            title={`Go to Step ${idx + 1}`}
          />
        ))}
      </div>
    </Panel>
  );
};
