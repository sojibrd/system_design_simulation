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
  const [isPanelOpen, setIsPanelOpen] = useState(true);

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Navigation Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full px-3 md:px-5 lg:px-6 py-4 flex flex-col gap-4">
        {/* Phase Selector Tabs */}
        <PhaseTabs
          currentPhaseId={currentPhaseId}
          phases={phaseList}
          onSelectPhase={(phaseId) => setCurrentPhaseId(phaseId)}
        />

        {/* Responsive Layout: Mobile stacked, Desktop split view */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 min-h-[600px]">
          {/* Left / Top: Architecture Canvas & Controls */}
          <div
            className={`flex flex-col gap-3.5 h-full ${
              isPanelOpen
                ? "lg:col-span-7 xl:col-span-8"
                : "lg:col-span-12 xl:col-span-12"
            }`}
          >
            {/* React Flow Diagram Canvas */}
            <div className="flex-1 min-h-[380px] lg:min-h-[500px]">
              <FlowDiagram
                key={currentPhaseId}
                nodes={nodes}
                edges={edges}
                fitViewSignal={isPanelOpen}
              />
            </div>

            {/* Playback & Flow Controls */}
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

          {/* Right / Bottom: Step-by-Step Walkthrough Panel (toggleable) */}
          {isPanelOpen && (
            <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[420px] lg:min-h-[560px]">
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
      </main>
    </div>
  );
}
