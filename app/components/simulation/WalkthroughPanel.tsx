"use client";

import React, { useState } from "react";
import { SimulationStep } from "@/app/lib/types";
import {
  Sparkles,
  BookOpen,
  Code2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface WalkthroughPanelProps {
  currentStep: SimulationStep | null;
  currentStepIndex: number;
  totalSteps: number;
  steps: SimulationStep[];
  onSelectStep: (index: number) => void;
}

export const WalkthroughPanel: React.FC<WalkthroughPanelProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  steps,
  onSelectStep,
}) => {
  const [showPayload, setShowPayload] = useState<boolean>(true);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);

  if (!currentStep) return null;

  return (
    <div className="flex flex-col h-full bg-zinc-900/90 border border-zinc-800 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-xl backdrop-blur-sm overflow-hidden">
      {/* Top Header: Step Badge & Title */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            {currentStep.flowType === "shorten" ? "🔗 Shorten Flow" : "🔄 Redirect Flow"}
          </span>
        </div>

        <button
          onClick={() => setShowAllSteps((prev) => !prev)}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-zinc-800"
          title="সব ধাপের তালিকা দেখুন"
        >
          <span>সব ধাপ ({totalSteps})</span>
          {showAllSteps ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Accordion: All steps overview */}
      {showAllSteps && (
        <div className="my-2 p-2 bg-zinc-950/80 rounded-xl border border-zinc-800 max-h-48 overflow-y-auto space-y-1.5 transition-all">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectStep(idx);
                  setShowAllSteps(false);
                }}
                className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2 transition-all ${
                  isCurrent
                    ? "bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 font-medium"
                    : isCompleted
                    ? "hover:bg-zinc-800/60 text-zinc-300"
                    : "hover:bg-zinc-800/40 text-zinc-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-700 shrink-0 flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </span>
                )}
                <span className="truncate flex-1">{step.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Walkthrough Body */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
        {/* Step Title */}
        <div>
          <h3 className="text-sm md:text-base font-bold text-zinc-100 leading-snug tracking-tight">
            {currentStep.title}
          </h3>
        </div>

        {/* Section 1: What Happens (Kid-friendly Bold Summary) */}
        <div className="bg-zinc-950/70 border border-zinc-800/90 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>কী ঘটছে (What happens):</span>
          </div>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed">
            {currentStep.whatHappens}
          </p>
        </div>

        {/* Section 2: Real World Analogy (Kid Friendly) */}
        {currentStep.analogy && (
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-400/80 rounded-r-xl p-3 bg-zinc-950/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>সহজ উপমা (Real-life Analogy):</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              {currentStep.analogy}
            </p>
          </div>
        )}

        {/* Section 3: Technical Reasoning (Why it matters) */}
        <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>কেন এভাবে কাজ করে (Technical Depth):</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {currentStep.whyItMatters}
          </p>
        </div>

        {/* Section 4: Payload / Code Snippet */}
        {currentStep.payloadSnippet && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <button
              onClick={() => setShowPayload((prev) => !prev)}
              className="w-full px-3 py-2 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 hover:text-cyan-300 transition-colors"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Request / Query Payload</span>
              </div>
              <span className="text-[10px] text-zinc-500">
                {showPayload ? "লুকান ▲" : "দেখুন ▼"}
              </span>
            </button>

            {showPayload && (
              <pre className="p-3 text-[11px] font-mono text-cyan-300/90 overflow-x-auto leading-relaxed bg-[#0d1117]">
                <code>{currentStep.payloadSnippet}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Progress Dots at Bottom */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-center gap-1.5">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectStep(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentStepIndex
                ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                : idx < currentStepIndex
                ? "w-2 bg-emerald-400/80"
                : "w-2 bg-zinc-700"
            }`}
            title={`Go to Step ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
