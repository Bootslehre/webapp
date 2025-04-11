import { LocalStorage } from "../lib/storage.svelte";

export class QuestionStats {
  constructor(
    public skip: number = 0,
    public correct: number = 0,
    public incorrect: number = 0,
    public pinned: boolean = false,
  ) { }
}

export interface QuestionaireStats {
  [questionId: string]: QuestionStats;
}

export interface QuestionaireStatsMap {
  [questionaireId: string]: QuestionaireStats;
}

export const state = new LocalStorage<QuestionaireStatsMap>('stats', {});

export function getQuestionStats(questionaireId: string, questionId: string) {
  return state.current?.[questionaireId]?.[questionId] || new QuestionStats();
}

export function setQuestionStats(questionaireId: string, questionId: string, stats: QuestionStats) {
  console.log('set stats', stats);

  if (!state.current[questionaireId]) {
    state.current[questionaireId] = {};
  }

  state.current[questionaireId][questionId] = stats;
}

export function createStatsService() {
  let state = $state(getProgressFromLocalStorage());
  console.log($state.snapshot(state));

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // $effect.root(() => {
  //   $effect(() => {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  //   })
  //   // const snapshot = $state.snapshot(statsState);
  //   // localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  // })

  return {
    get stats() {
      return state
    },
    set stats(v) {
      state = v
    },
    getQuestionStats(questionaireId: string, questionId: string) {
      console.log($state.snapshot(state));
      console.log('get stats', questionaireId, questionId)
      return state?.[questionaireId]?.[questionId] || new QuestionStats();
    },
    setQuestionStats(questionaireId: string, questionId: string, stats: QuestionStats) {
      console.log('set stats', stats);

      if (!state[questionaireId]) {
        state[questionaireId] = {};
      }

      state[questionaireId][questionId] = stats;
      persist();
    }
  }
}

export const statsService = createStatsService();

export const statsState = $state<QuestionaireStatsMap>(getProgressFromLocalStorage());

export const STORAGE_KEY = 'progress';

export function getProgressFromLocalStorage(): QuestionaireStatsMap {
  try {
    const res = localStorage.get(STORAGE_KEY);
    return JSON.parse(res);
  } catch {
    return {};
  }
}

// export function getQuestionStats(questionaireId: string, questionId: string) {
//   const map = getProgressFromLocalStorage();
//   return map?.[questionaireId]?.[questionId] || new QuestionStats();
// }

export function persist() {
  const snapshot = $state.snapshot(statsState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  // console.log('persisted', snapshot);
}

export function logSkipQuestion(questionaireId: string, questionId: string) {
  if (!statsState[questionaireId]) {
    statsState[questionaireId] = {};
  }

  if (!statsState[questionaireId][questionId]) {
    statsState[questionaireId][questionId] = new QuestionStats();
  }

  statsState[questionaireId][questionId].skip++;
  persist()
}

export function logCorrectAnswer(questionaireId: string, questionId: string) {
  if (!statsState[questionaireId]) {
    statsState[questionaireId] = {};
  }

  if (!statsState[questionaireId][questionId]) {
    statsState[questionaireId][questionId] = new QuestionStats();
  }

  statsState[questionaireId][questionId].correct++;
  persist()
}

export function logIncorrectAnswer(questionaireId: string, questionId: string) {
  if (!statsState[questionaireId]) {
    statsState[questionaireId] = {};
  }

  if (!statsState[questionaireId][questionId]) {
    statsState[questionaireId][questionId] = new QuestionStats();
  }

  statsState[questionaireId][questionId].incorrect++;
  persist()
}

export function togglePinnedAndLog(questionaireId: string, questionId: string) {
  if (!statsState[questionaireId]) {
    statsState[questionaireId] = {};
  }

  if (!statsState[questionaireId][questionId]) {
    statsState[questionaireId][questionId] = new QuestionStats();
  }

  const isPinned = statsState[questionaireId][questionId].pinned
  statsState[questionaireId][questionId].pinned = !isPinned;
  persist()
}

export function getStats(questionaireId: string, questionId: string) {
  if (!statsState[questionaireId]) {
    statsState[questionaireId] = {};
  }

  if (!statsState[questionaireId][questionId]) {
    statsState[questionaireId][questionId] = new QuestionStats();
  }

  return statsState[questionaireId][questionId];
}
