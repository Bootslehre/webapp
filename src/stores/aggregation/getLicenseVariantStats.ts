import type { EnrichedQuestionaire } from "../../utils/licenses";
import { MAX_PROGESS } from "../constants";
import type { LicenseStats } from "../stats.svelte";

export interface LicenseVariantStats {
  pinnedQuestions: number,
  incorrectlyAnsweredQuestions: number,
  noProgress: number,
  progress0: number,
  progress1: number,
  progress2: number,
  progress3: number,
  progress4: number,
  progress5: number,
  totalProgressPercentage: number,
}

export function getLicenseVariantStats(licenseVariant: EnrichedQuestionaire, stats: LicenseStats): LicenseVariantStats {
  const licenseVariantQuestionIds = licenseVariant?.questions.map((q) => q.id) || [];
  const relevantStatsQuestionIds = Object.keys(stats).filter((key) => licenseVariantQuestionIds.includes(key));
  const totalProgressPoints = licenseVariantQuestionIds.length * MAX_PROGESS;
  const achievedProgressPoints = relevantStatsQuestionIds.reduce((sum, cur) => sum + (stats[cur].progress || 0), 0);

  return {
    pinnedQuestions: relevantStatsQuestionIds.filter((key) => stats[key].pinned).length,
    incorrectlyAnsweredQuestions: relevantStatsQuestionIds.filter((key) => stats[key].progress === 0).length,
    noProgress: licenseVariantQuestionIds.length - relevantStatsQuestionIds.length,
    progress0: relevantStatsQuestionIds.filter((key) => stats[key].progress === 0).length,
    progress1: relevantStatsQuestionIds.filter((key) => stats[key].progress === 1).length,
    progress2: relevantStatsQuestionIds.filter((key) => stats[key].progress === 2).length,
    progress3: relevantStatsQuestionIds.filter((key) => stats[key].progress === 3).length,
    progress4: relevantStatsQuestionIds.filter((key) => stats[key].progress === 4).length,
    progress5: relevantStatsQuestionIds.filter((key) => stats[key].progress === 5).length,
    totalProgressPercentage: Math.round((achievedProgressPoints / totalProgressPoints) * 100),
  }
}