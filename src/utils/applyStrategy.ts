import { statsService, type LicenseStats } from '../stores/stats.svelte';
import type { EnrichedQuestionaire } from './licenses';
import { shuffle } from './shuffle';

export type NextQuestionStrategies = 'random' | 'relevance' | 'pinned' | 'incorrect';

export function applyStrategy(strategy: NextQuestionStrategies, questionaire: EnrichedQuestionaire) {
  const stats = statsService.getLicenseStatsSnapshot(questionaire.id);

  switch (strategy) {
    case 'relevance':
      return applyRelevanceStrategy(questionaire);
    case 'pinned':
      return applyPinnedStrategy(questionaire, stats);
    case 'incorrect':
      return applyIncorrectStrategy(questionaire, stats);
    case 'random':
      return applyRandomStrategy(questionaire);
    default:
      return questionaire.questions;
  }
}

function applyRelevanceStrategy(questionaire: EnrichedQuestionaire) {
  return shuffle(questionaire.questions); // TODO
}

function applyRandomStrategy(questionaire: EnrichedQuestionaire) {
  return shuffle(questionaire.questions);
}

function applyPinnedStrategy(questionaire: EnrichedQuestionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].pinned)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}

function applyIncorrectStrategy(questionaire: EnrichedQuestionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].progress === 0)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}
