import { SBF_BINNEN_BASIS, SBF_BINNEN_SEGEL, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH } from '../../static/generated';
import type { Questionaire } from '../types';

interface AdditionalInformation {
  displayName: string;
  description: string;
  slug: string;
}

export type EnrichedQuestionaire = Questionaire & AdditionalInformation;

export const QUESTIONAIRES: EnrichedQuestionaire[] = [
  {
    ...SBF_BINNEN_BASIS,
    displayName: 'Binnen Basis',
    description: '',
    slug: 'binnen-basis',
  },
  {
    ...SBF_BINNEN_SEGEL,
    displayName: 'Binnen Segel',
    description: '',
    slug: 'binnen-segel',
  },
  {
    ...SBF_BINNEN_SPEZIFISCH,
    displayName: 'Binnen Spezifisch',
    description: '',
    slug: 'binnen-spezifisch',
  },
  {
    ...SBF_SEE_BASIS,
    displayName: 'See Basis',
    description: '',
    slug: 'see-basis',
  },
  {
    ...SBF_SEE_SPEZIFISCH,
    displayName: 'See Spezifisch',
    description: '',
    slug: 'see-spezifisch',
  },
];

export function getQuestionaire(id: string) {
  return QUESTIONAIRES.find((q) => q.id === id);
}

export function getQuestionaireBySlug(slug: string) {
  return QUESTIONAIRES.find((q) => q.slug === slug);
}
