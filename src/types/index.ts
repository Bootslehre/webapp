export interface QuestionaireSource {
    id: string;
    url: string;
}

export interface Questionaire {
    id: string;
    questions: Array<Question>;
}

export interface Question {
    id: string;
    text: string;
    media: Array<Media>;
    answers: Array<Answer>;
}

export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Media {
    src: string;
    title: string;
    alt: string;
}
