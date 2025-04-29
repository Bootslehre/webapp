import { readFromLocalStorage, writeToLocalStorage } from '../utils/localStorage';
import type { LicenseId, SbfSeeVariant } from '../utils/licenses';

export type ConfigMap = {
  [id in LicenseId]: SbfSeeVariant;
};

const FALLBACK_VALUE: ConfigMap = {
  sbfSee: 'SBF_SEE_KOMPLETT',
  sbfBinnen: 'TODO' as any,
};

const STORAGE_KEY = 'config';

export function createConfigService() {
  let config = $state(readFromLocalStorage<ConfigMap>(STORAGE_KEY, FALLBACK_VALUE));

  return {
    get config() {
      return config;
    },

    update(key: string, value: SbfSeeVariant) {
      config = { ...config, [key]: value };
      writeToLocalStorage(STORAGE_KEY, config);
    },
  };
}

export const configService = createConfigService();
