export interface QuestionaireSource {
  id: string;
  url: string;
}

export interface Question {
  id: string;
  text: string;
  images: Array<string>;
  answers: Array<Answer>;
}

export interface Answer {
  id: string;
  text: string;
}
