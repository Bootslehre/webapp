import type { AnswerWithCorrectness } from '../types';
import { shuffle } from './shuffle';

export function shuffleAnswers(answers: string[]): AnswerWithCorrectness[] {
  return shuffle(answers.map((answer, index) => ({ text: answer, isCorrect: index === 0 })));
}
