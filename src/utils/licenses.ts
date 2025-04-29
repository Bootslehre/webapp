import type { Question } from '../types';

export type LicenseId = 'sbfSee' | 'sbfBinnen';
export type SbfSeeVariant = 'SBF_SEE_KOMPLETT' | 'SBF_SEE_OHNE_BASIS';

interface LicenseListItem {
  id: LicenseId;
  name: string;
}

export const LICENSES: LicenseListItem[] = [
  { id: 'sbfSee', name: 'SBF See' },
  { id: 'sbfBinnen', name: 'SBF Binnen' },
];

export type Questionaire = {
  id: LicenseId;
  questions: Array<Question>;
  displayName: string;
  description: string;
};
