import { STORAGE_KEY } from "./constants";

export class QuestionStats {
  constructor(
    public progress: number = 0,
    public pinned: boolean = false,
  ) { }
}

export interface QuestionaireStats {
  [questionId: string]: QuestionStats;
}

export interface QuestionaireStatsMap {
  [questionaireId: string]: QuestionaireStats;
}

export function createStatsService() {
  let state = $state(getProgressFromLocalStorage());

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  return {
    get stats() {
      return state
    },
    set stats(v) {
      state = v
    },
    getPinnedQuestionIds(questionaireId: string) {
      const statsWithFallback = state[questionaireId] || {}
      return Object.keys(statsWithFallback).filter(key => statsWithFallback[key].pinned);
    },
    getQuestionaireStatsSnapshot(questionaireId: string): QuestionaireStats {
      return $state.snapshot(state?.[questionaireId]) || {}
    },
    getQuestionStats(questionaireId: string, questionId: string): QuestionStats | undefined {
      return state?.[questionaireId]?.[questionId];
    },
    resetQuestionaireStats(questionaireId: string) {
      state[questionaireId] = {};
      persist();
    },
    setQuestionStats(questionaireId: string, questionId: string, stats: QuestionStats) {
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

export function getProgressFromLocalStorage(): QuestionaireStatsMap {
  try {
    const res = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(res!) || {};
  } catch {
    return {};
  }
}
