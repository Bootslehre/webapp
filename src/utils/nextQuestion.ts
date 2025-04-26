import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { STRATEGY_QUERY_PARAM } from '../stores/constants';
import { statsService } from '../stores/stats.svelte';
import type { Question } from '../types';
import { type NextQuestionStrategies, PinnedStrategy, RelevanceStrategy, RandomStrategy } from './nextQuestionStrategy';
import { QUESTIONAIRES } from './questionaires';

function getNextQuestion(strategy: NextQuestionStrategies, questionaireId: string, currentQuestionId?: string): Question | undefined {
  const questionaire = QUESTIONAIRES.find(q => q.id === questionaireId)!;
  const stats = statsService.getQuestionaireStatsSnapshot(questionaireId);

  switch (strategy) {
    case 'random':
      return RandomStrategy.next(questionaire, stats, currentQuestionId);
    case 'relevance':
      return RelevanceStrategy.next(questionaire, stats, currentQuestionId);
    case 'pinned':
      return PinnedStrategy.next(questionaire, stats, currentQuestionId);
  }
}

export function goToNextQuestion(strategy: NextQuestionStrategies, questionaireId: string, currentQuestionId?: string) {
  const question = getNextQuestion(strategy, questionaireId, currentQuestionId)

  if (question) {
    goto(`/lists/${questionaireId}/${question.id}?${STRATEGY_QUERY_PARAM}=${strategy}`);
  } else {
    // todo display error message
    goto(`/lists/${questionaireId}`);
  }
}