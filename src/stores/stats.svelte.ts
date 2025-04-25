import { STORAGE_KEY, MAX_PROGESS } from "./constants";

export interface QuestionStats {
  progress?: number;
  pinned?: boolean;
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

  function getQuestionStats(questionaireId: string, questionId: string): QuestionStats | undefined {
    return state?.[questionaireId]?.[questionId]
  }

  function setQuestionStats(questionaireId: string, questionId: string, stats: QuestionStats) {
    if (!state[questionaireId]) {
      state[questionaireId] = {};
    }

    state[questionaireId][questionId] = stats;
    persist();
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

    getQuestionStats,

    resetQuestionaireStats(questionaireId: string) {
      state[questionaireId] = {};
      persist();
    },

    registerCorrectAnswer(questionaireId: string, questionId: string) {
      const stats = getQuestionStats(questionaireId, questionId);

      setQuestionStats(questionaireId, questionId, {
        pinned: stats?.pinned,
        progress: Math.min((stats?.progress || 0) + 1, MAX_PROGESS),
      });
    },

    registerWrongAnswer(questionaireId: string, questionId: string) {
      const stats = getQuestionStats(questionaireId, questionId);

      setQuestionStats(questionaireId, questionId, {
        pinned: stats?.pinned,
        progress: 0,
      })
    },

    toggleQuestionPinned(questionaireId: string, questionId: string) {
      const stats = getQuestionStats(questionaireId, questionId);

      setQuestionStats(questionaireId, questionId, {
        progress: stats?.progress,
        pinned: !stats?.pinned,
      });
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
