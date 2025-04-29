import { page } from '$app/state';
import type { EnrichedQuestionaire, LicenseId } from '../../utils/licenses';
import { configService } from '../config.svelte';
import { statsService } from '../stats.svelte';
import { getLicenseVariant } from './getLicenseVariant';
import { getLicenseVariantStats, type LicenseVariantStats } from './getLicenseVariantStats';

export function createAggregatorService() {
  const licenseId = $derived(page.params?.licenseId as LicenseId | undefined);
  const config = $derived(configService.config);

  let licenseVariant = $state<EnrichedQuestionaire | undefined>();
  let licenseVariantStats = $state<LicenseVariantStats | undefined>();

  $effect.root(() => {
    $effect(() => {
      if (licenseId === 'sbfSee') {
        licenseVariant = getLicenseVariant(config.sbfSee);
        licenseVariantStats = getLicenseVariantStats(licenseVariant, statsService.getLicenseStatsSnapshot(licenseId));
      } else {
        licenseVariant = undefined;
        licenseVariantStats = undefined;
      }
    })
  })

  return {
    get licenseVariant() {
      return licenseVariant;
    },
    get licenseVariantStats() {
      return licenseVariantStats;
    },
  };
}

export const aggregatorService = createAggregatorService();
