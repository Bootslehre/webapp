import type { Questionaire } from '../types';

export type LicenseId = 'sbfSee' | 'sbfBinnen';
export type SbfSeeVariant = 'SBF_SEE_KOMPLETT' | 'SBF_SEE_OHNE_BASIS';

interface LicenseListItem {
  id: LicenseId
  name: string,
}

export const LICENSES: LicenseListItem[] = [
  { id: 'sbfSee', name: 'SBF See' },
  { id: 'sbfBinnen', name: 'SBF Binnen' },
];

export type EnrichedQuestionaire = Omit<Questionaire, 'id'> & {
  id: LicenseId;
  displayName: string;
  description: string;
};

