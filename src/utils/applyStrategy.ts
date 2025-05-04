import { statsService, type LicenseStats } from '../stores/stats.svelte';
import type { Questionaire } from './licenses';
import { shuffle } from './shuffle';

export type NextQuestionStrategies = 'random' | 'relevance' | 'pinned' | 'incorrect';

export function applyStrategy(strategy: NextQuestionStrategies, questionaire: Questionaire) {
  const stats = statsService.getLicenseStatsSnapshot(questionaire.id);

  switch (strategy) {
    case 'relevance':
      return applyRelevanceStrategy(questionaire, stats);
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

function applyRelevanceStrategy(questionaire: Questionaire, stats: LicenseStats) {
  const questionsWithProgress = questionaire.questions.map((q) => ({ ...q, progress: stats?.[q.id]?.progress || 0 }));
  const progress0 = questionsWithProgress.filter((q) => q.progress === 0);
  const progress1 = questionsWithProgress.filter((q) => q.progress === 1);
  const progress2 = questionsWithProgress.filter((q) => q.progress === 2);
  const progress3 = questionsWithProgress.filter((q) => q.progress === 3);
  const progress4 = questionsWithProgress.filter((q) => q.progress === 4);
  const progress5 = questionsWithProgress.filter((q) => q.progress === 5);

  return [
    //
    ...shuffle(progress0),
    ...shuffle(progress1),
    ...shuffle(progress2),
    ...shuffle(progress3),
    ...shuffle(progress4),
    ...shuffle(progress5),
  ];
}

function applyRandomStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions);
}

function applyPinnedStrategy(questionaire: Questionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].pinned)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}

function applyIncorrectStrategy(questionaire: Questionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].progress === 0)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}
