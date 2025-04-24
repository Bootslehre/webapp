import type { QuestionaireStats } from "../stores/stats.svelte";
import type { Question, Questionaire } from "../types";

export type NextQuestionStrategies = 'random' | 'unansweredFirst'

class NextQuestionStrategy {
  constructor(
    public next: (questionaire: Questionaire, stats: QuestionaireStats, lastQuestionId?: string) => Question
  ) { }
}

export const RandomStrategy = new NextQuestionStrategy((questionaire, _stats, lastQuestionId) => {
  const withoutLastQuestion = questionaire.questions.filter(q => q.id !== lastQuestionId)
  return getRandomEntry(withoutLastQuestion);
})

export const MAX_PROGESS = 5;

export const UnansweredFirstStrategy = new NextQuestionStrategy((questionaire, stats, lastQuestionId) => {
  const questions = questionaire.questions
    .filter(q => q.id !== lastQuestionId)
    .map(question => {
      const progress = stats?.[question.id]?.progress || 0;
      // progress can range from -1 to 5. we ignore the negative values for the next question recommendation calculation
      const respectedProgress = Math.max(0, progress);
      return ({ ...question, progress: respectedProgress })
    });

  // Calculate the likelihood of each question being chosen
  const totalWeight = questions.reduce((sum, q) => {
    return sum + (MAX_PROGESS - q.progress);
  }, 0);

  // Generate a random number within the range of total weight
  let randomWeight = Math.random() * totalWeight;

  // Select the next question based on the random weight
  for (const q of questions) {
    randomWeight -= (MAX_PROGESS - q.progress);
    if (randomWeight <= 0) {
      return q;
    }
  }

  // Fallback in case no question is selected (shouldn't happen)
  return questions[0];
})

function getRandomEntry<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array.at(randomIndex)!;
}
