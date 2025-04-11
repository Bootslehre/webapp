import { goto } from '$app/navigation';
import type { Question, Questionaire } from '../types';
import { QUESTIONAIRES } from './questionaires';

export function getNextQuestion({ questions }: Questionaire): Question {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions.at(randomIndex)!;
}

export function goToNextQuestion(questionaireId: string) {
  const questionaire = QUESTIONAIRES.find(q => q.id === questionaireId)!;
  const randomIndex = Math.floor(Math.random() * questionaire.questions.length);
  const answer = questionaire.questions.at(randomIndex)!;
  goto(`/lists/${questionaireId}/${answer.id}`);
}