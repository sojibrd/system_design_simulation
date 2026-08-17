import { PhaseConfig, PhaseId } from "../../types";
import { beginnerConfig } from "./beginner";
import { intermediateConfig } from "./intermediate";
import { expertConfig } from "./expert";

export const urlShortenerPhases: Record<PhaseId, PhaseConfig> = {
  beginner: beginnerConfig,
  intermediate: intermediateConfig,
  expert: expertConfig,
};

export const getPhaseConfig = (phaseId: PhaseId): PhaseConfig => {
  return urlShortenerPhases[phaseId] || beginnerConfig;
};

export { beginnerConfig, intermediateConfig, expertConfig };
