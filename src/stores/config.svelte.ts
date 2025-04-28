import { readFromLocalStorage, writeToLocalStorage } from '../utils/localStorage';
import type { SbfSeeVariant } from '../utils/questionaires';

export type ConfigMap = {
  sbfSee: SbfSeeVariant
}

const FALLBACK_CONFIG_MAP: ConfigMap = {
  sbfSee: 'SBF_SEE_KOMPLETT'
};

const STORAGE_KEY = 'config';

export function createConfigService() {
  let config = $state(readFromLocalStorage<ConfigMap>(STORAGE_KEY, FALLBACK_CONFIG_MAP));

  return {
    get config() {
      return config;
    },

    update(newValue: ConfigMap) {
      config = newValue;
      writeToLocalStorage(STORAGE_KEY, config);
    },
  };
}

export const configService = createConfigService();
