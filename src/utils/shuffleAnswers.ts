import type { Answer } from "../types";
import { shuffle } from "./shuffle";

export type AnswerWithCorrectness = Answer & { isCorrect: boolean };

export function shuffleAnswers(answers: Answer[]): AnswerWithCorrectness[] {
  return shuffle(answers.map((answer, index) => ({ ...answer, isCorrect: index === 0 })));
}