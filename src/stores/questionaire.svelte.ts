import type { Question } from '../types';

export function createQuestionaireService() {
  let questions = $state<Question[]>([]);

  let currentQuestionIndex = $state(0);
  const nextQuestionIndex = $derived(currentQuestionIndex + 1);
  const previousQuestionIndex = $derived(currentQuestionIndex - 1);

  const currentQuestion = $derived(questions[currentQuestionIndex]);
  const nextQuestion = $derived(questions[nextQuestionIndex]);
  const previousQuestion = $derived(questions[previousQuestionIndex]);

  return {
    // takes in a (sub)set of questions (i.e. all questions, pinned questions, ...)
    initialize(newQuestions: Question[]) {
      questions = newQuestions;
      currentQuestionIndex = 0;
    },

    next() {
      currentQuestionIndex += 1;
    },

    previous() {
      currentQuestionIndex -= 1;
    },

    getPreviousQuestion(): Question | undefined {
      return questions[previousQuestionIndex];
    },

    getNextQuestion(): Question | undefined {
      return questions[nextQuestionIndex];
    },

    get currentQuestion(): Question | undefined {
      return currentQuestion;
    },

    get nextQuestion(): Question | undefined {
      return nextQuestion;
    },

    get previousQuestion(): Question | undefined {
      return previousQuestion;
    },

    get questions(): Question[] {
      return questions;
    },
  };
}

export const questionaireService = createQuestionaireService();
