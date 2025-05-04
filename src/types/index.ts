export interface QuestionaireSource {
  id: string;
  url: string;
}

export interface Question {
  id: string;
  text: string;
  images: Array<string>;
  answers: Array<string>;
}

export type AnswerWithCorrectness = { text: string; isCorrect: boolean };
