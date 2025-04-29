import { page } from '$app/state';
import type { NextQuestionStrategies } from '../../utils/applyStrategy';
import { STRATEGY_QUERY_PARAM } from '../../utils/constants';
import type { Questionaire, LicenseId } from '../../utils/licenses';
import { configService } from '../config.svelte';
import { statsService } from '../stats.svelte';
import { getQuestionaire } from './getQuestionaire';
import { getQuestionaireStats, type LicenseVariantStats } from './getQuestionaireStats';

function createAggregatorService() {
  const licenseId = $derived(page.params?.licenseId as LicenseId | undefined);
  const strategy = $derived((page.url.searchParams.get(STRATEGY_QUERY_PARAM) || 'relevance') as NextQuestionStrategies);
  const config = $derived(configService.config);

  const state = $derived.by<{ questionaire?: Questionaire; questionaireStats?: LicenseVariantStats }>(() => {
    if (licenseId === 'sbfSee') {
      const questionaire = getQuestionaire(config.sbfSee);

      return {
        questionaire,
        questionaireStats: getQuestionaireStats(questionaire, statsService.getLicenseStatsSnapshot(licenseId)),
      };
    }
    return {};
  });

  return {
    get strategy() {
      return strategy;
    },
    get questionaire() {
      return state.questionaire;
    },
    get questionaireStats() {
      return state.questionaireStats;
    },
  };
}

export const aggregatorService = createAggregatorService();
