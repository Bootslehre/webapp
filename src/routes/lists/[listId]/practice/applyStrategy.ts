import { statsService, type QuestionaireStats } from '../../../../stores/stats.svelte';
import type { Questionaire } from '../../../../types';
import { shuffle } from '../../../../utils/shuffle';

export type NextQuestionStrategies = 'random' | 'relevance' | 'pinned';

export function applyStrategy(strategy: NextQuestionStrategies, questionaire: Questionaire) {
  const stats = statsService.getQuestionaireStatsSnapshot(questionaire.id);

  switch (strategy) {
    case 'relevance':
      return applyRelevanceStrategy(questionaire);
    case 'pinned':
      return applyPinnedStrategy(questionaire, stats);
    case 'random':
      return applyRandomStrategy(questionaire);
    default:
      return questionaire.questions;
  }
}

function applyRelevanceStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions); // TODO
}

function applyRandomStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions);
}

function applyPinnedStrategy(questionaire: Questionaire, stats: QuestionaireStats) {
  const pinnedQuestionIds = Object.keys(stats).filter((key) => stats[key].pinned);

  const pinnedQuestions = pinnedQuestionIds.map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(pinnedQuestions);
}
