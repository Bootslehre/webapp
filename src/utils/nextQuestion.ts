import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { statsService } from '../stores/stats.svelte';
import type { Question } from '../types';
import { type NextQuestionStrategies, UnansweredFirstStrategy, RandomStrategy } from './nextQuestionStrategy';
import { QUESTIONAIRES } from './questionaires';

function getNextQuestion(strategy: NextQuestionStrategies, questionaireId: string, lastQuestionId?: string,): Question {
  const questionaire = QUESTIONAIRES.find(q => q.id === questionaireId)!;
  const stats = statsService.getQuestionaireStatsSnapshot(questionaireId);

  switch (strategy) {
    case 'random':
      return RandomStrategy.next(questionaire, stats, lastQuestionId);
    case 'unansweredFirst':
      return UnansweredFirstStrategy.next(questionaire, stats, lastQuestionId);
  }
}

export function goToNextQuestion(questionaireId: string, lastQuestionId?: string) {
  const question = getNextQuestion('unansweredFirst', questionaireId, lastQuestionId)
  goto(`${base}/lists/${questionaireId}/${question.id}`);
}
