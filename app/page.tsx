"use client";

import React, { useState } from "react";
import { PhaseId } from "@/app/lib/types";
import {
  urlShortenerPhases,
  beginnerConfig,
  intermediateConfig,
  expertConfig,
} from "@/app/lib/simulations/url-shortener";
import { useSimulation } from "@/app/hooks/useSimulation";
import { Header } from "@/app/components/simulation/Header";
import { PhaseTabs } from "@/app/components/simulation/PhaseTabs";
import { DesignNotes } from "@/app/components/simulation/DesignNotes";
import { FlowDiagram } from "@/app/components/simulation/FlowDiagram";
import { ControlsBar } from "@/app/components/simulation/ControlsBar";
import { WalkthroughPanel } from "@/app/components/simulation/WalkthroughPanel";
import { Sheet } from "@/app/components/ui";

export default function Home() {
  const [currentPhaseId, setCurrentPhaseId] = useState<PhaseId>("beginner");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const currentPhaseConfig = urlShortenerPhases[currentPhaseId] || beginnerConfig;
  const phaseList = [beginnerConfig, intermediateConfig, expertConfig];

  const {
    currentStepIndex,
    isPlaying,
    isFinished,
    speed,
    flowType,
    availableFlows,
    totalSteps,
    currentStep,
    currentSteps,
    nodes,
    edges,
    play,
    pause,
    nextStep,
    prevStep,
    goToStep,
    reset,
    setSpeed,
    setFlowType,
  } = useSimulation(currentPhaseConfig);

  return (
    /* `h-dvh`, not `h-screen`: on a phone the address bar eats into 100vh and
       the controls row gets cut off below the fold. */
    <div className="surface-app h-dvh overflow-hidden flex flex-col antialiased">
      {/* Top Navigation Header */}
      <Header />

      {/* Main Container — fills exactly what the header leaves behind */}
      <main className="flex-1 min-h-0 w-full px-2 sm:px-3 md:px-5 lg:px-6 py-2 md:py-3 flex flex-col gap-2 md:gap-3">
        {/* Phase Selector Tabs */}
        <div className="shrink-0 flex flex-col gap-2">
          <PhaseTabs
            currentPhaseId={currentPhaseId}
            phases={phaseList}
            onSelectPhase={(phaseId) => setCurrentPhaseId(phaseId)}
          />
          <DesignNotes phase={currentPhaseConfig} />
        </div>

        {/* Simulation stage — takes every pixel the other rows do not need */}
        {/* `relative` so the mobile walkthrough sheet can anchor to the stage
            rather than the viewport — it must not cover the controls row. */}
        <div className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Architecture Canvas. On a phone it keeps the full stage even when
              the walkthrough is open — the walkthrough floats over it. */}
          <div
            className={`min-h-0 h-full ${
              isPanelOpen ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12"
            }`}
          >
            <FlowDiagram
              key={currentPhaseId}
              nodes={nodes}
              edges={edges}
              fitViewSignal={isPanelOpen}
            />
          </div>

          {/* Step-by-step walkthrough: a column on desktop, a bottom sheet on
              a phone. */}
          <Sheet
            open={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            label="Step walkthrough"
            className="min-h-0 lg:col-span-5 xl:col-span-4"
          >
            <WalkthroughPanel
              currentStep={currentStep}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              steps={currentSteps}
              onSelectStep={goToStep}
              isFinished={isFinished}
              onClose={() => setIsPanelOpen(false)}
            />
          </Sheet>
        </div>

        {/* Playback & Flow Controls — always full width, pinned to the bottom */}
        <div className="shrink-0">
          <ControlsBar
            isPlaying={isPlaying}
            speed={speed}
            flowType={flowType}
            availableFlows={availableFlows}
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
            onPlay={play}
            onPause={pause}
            onNext={nextStep}
            onPrev={prevStep}
            onReset={reset}
            onSpeedChange={setSpeed}
            onFlowChange={setFlowType}
            isPanelOpen={isPanelOpen}
            onTogglePanel={() => setIsPanelOpen((open) => !open)}
          />
        </div>
      </main>
    </div>
  );
}
