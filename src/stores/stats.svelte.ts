import { readFromLocalStorage, writeToLocalStorage } from '../utils/localStorage';
import type { LicenseId } from '../utils/licenses';
import { MAX_PROGESS } from './constants';

export interface QuestionStats {
  progress?: number;
  pinned?: boolean;
}

export interface LicenseStats {
  [questionId: string]: QuestionStats;
}

export type LicenseStatsMap = {
  [licenseId in LicenseId]: LicenseStats;
};

const FALLBACK_VALUE: LicenseStatsMap = {
  sbfBinnen: {},
  sbfSee: {},
};

const STORAGE_KEY = 'progress';

export function createStatsService() {
  const stats = $state(readFromLocalStorage<LicenseStatsMap>(STORAGE_KEY, FALLBACK_VALUE));

  function persist() {
    writeToLocalStorage(STORAGE_KEY, stats);
  }

  function getQuestionStats(licenseId: LicenseId, questionId: string): QuestionStats | undefined {
    return stats[licenseId]?.[questionId];
  }

  function setQuestionStats(licenseId: LicenseId, questionId: string, newStats: QuestionStats) {
    if (!stats[licenseId]) {
      stats[licenseId] = {};
    }

    stats[licenseId][questionId] = newStats;
    persist();
  }

  return {
    getLicenseStatsSnapshot(licenseId: LicenseId): LicenseStats {
      return $state.snapshot(stats[licenseId]) || {};
    },

    getQuestionStats,

    resetLicenseStats(licenseId: LicenseId) {
      stats[licenseId] = {};
      persist();
    },

    registerCorrectAnswer(licenseId: LicenseId, questionId: string) {
      const stats = getQuestionStats(licenseId, questionId);

      setQuestionStats(licenseId, questionId, {
        pinned: stats?.pinned,
        progress: Math.min((stats?.progress || 0) + 1, MAX_PROGESS),
      });
    },

    registerWrongAnswer(licenseId: LicenseId, questionId: string) {
      const stats = getQuestionStats(licenseId, questionId);

      setQuestionStats(licenseId, questionId, {
        pinned: stats?.pinned,
        progress: 0,
      });
    },

    toggleQuestionPinned(licenseId: LicenseId, questionId: string) {
      const stats = getQuestionStats(licenseId, questionId);

      setQuestionStats(licenseId, questionId, {
        progress: stats?.progress,
        pinned: !stats?.pinned,
      });
    },
  };
}

export const statsService = createStatsService();
