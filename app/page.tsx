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
import { FlowDiagram } from "@/app/components/simulation/FlowDiagram";
import { ControlsBar } from "@/app/components/simulation/ControlsBar";
import { WalkthroughPanel } from "@/app/components/simulation/WalkthroughPanel";

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
    <div className="h-screen overflow-hidden bg-paper text-ink-soft flex flex-col antialiased selection:bg-ink selection:text-paper">
      {/* Top Navigation Header */}
      <Header />

      {/* Main Container — fills exactly what the header leaves behind */}
      <main className="flex-1 min-h-0 w-full px-3 md:px-5 lg:px-6 py-3 flex flex-col gap-3">
        {/* Phase Selector Tabs */}
        <div className="shrink-0">
          <PhaseTabs
            currentPhaseId={currentPhaseId}
            phases={phaseList}
            onSelectPhase={(phaseId) => setCurrentPhaseId(phaseId)}
          />
        </div>

        {/* Simulation stage — takes every pixel the other rows do not need */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Architecture Canvas */}
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

          {/* Step-by-Step Walkthrough Panel (toggleable) */}
          {isPanelOpen && (
            <div className="min-h-0 h-full lg:col-span-5 xl:col-span-4">
              <WalkthroughPanel
                currentStep={currentStep}
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                steps={currentSteps}
                onSelectStep={goToStep}
                isFinished={isFinished}
              />
            </div>
          )}
        </div>

        {/* Playback & Flow Controls — always full width, pinned to the bottom */}
        <div className="shrink-0">
          <ControlsBar
            isPlaying={isPlaying}
            speed={speed}
            flowType={flowType}
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
