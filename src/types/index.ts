export interface QuestionaireSource {
  id: string;
  url: string;
}

export interface Question {
  id: string;
  text: string;
  media: Array<Media>;
  answers: Array<Answer>;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Media {
  src: string;
  fileName: string;
  title: string;
  alt: string;
}
