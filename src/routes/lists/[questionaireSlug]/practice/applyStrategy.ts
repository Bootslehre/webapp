import { statsService, type QuestionaireStats } from '../../../../stores/stats.svelte';
import type { Questionaire } from '../../../../types';
import type { EnrichedQuestionaire } from '../../../../utils/questionaires';
import { shuffle } from '../../../../utils/shuffle';

export type NextQuestionStrategies = 'random' | 'relevance' | 'pinned' | 'incorrect';

export function applyStrategy(strategy: NextQuestionStrategies, questionaire: Questionaire | EnrichedQuestionaire) {
  const stats = statsService.getQuestionaireStatsSnapshot(questionaire.id);

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

function applyRelevanceStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions); // TODO
}

function applyRandomStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions);
}

function applyPinnedStrategy(questionaire: Questionaire, stats: QuestionaireStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].pinned)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}

function applyIncorrectStrategy(questionaire: Questionaire, stats: QuestionaireStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].progress === 0)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}

