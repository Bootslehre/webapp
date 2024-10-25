import type { Question, Questionaire } from '../types';

export function getNextQuestion({ questions }: Questionaire): Question {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions.at(randomIndex)!;
}
