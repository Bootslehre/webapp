import { SBF_BINNEN_BASIS, SBF_BINNEN_SEGEL, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH } from '../../static/generated';
import type { Questionaire } from '../types';

interface AdditionalInformation {
  displayName: string;
  description: string;
  slug: string;
}

export type EnrichedQuestionaire = Questionaire & AdditionalInformation;

export type RealQuestionaire = Questionaire & {
  variant: string;
  displayName: string;
  description: string;
  configuration: string;
};

/** @deprecated */
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

export function getQuestionaireById(id: string) {
  return QUESTIONAIRES.find((q) => q.id === id);
}

export function getQuestionaireBySlug(slug: string) {
  return QUESTIONAIRES.find((q) => q.slug === slug);
}

export type License = 'sbf-see' | 'sbf-binnen';
export type SbfSeeVariant = 'SBF_SEE_KOMPLETT' | 'SBF_SEE_OHNE_BASIS'

export function getQuestionaire(variant: SbfSeeVariant): RealQuestionaire {
  if (variant === 'SBF_SEE_KOMPLETT') {
    return {
      id: 'sbf-see',
      variant: variant,
      displayName: 'SBF See',
      configuration: 'Komplett',
      description: 'Der SBF See ist ein super toller Schein',
      questions: [...SBF_SEE_BASIS.questions, ...SBF_SEE_SPEZIFISCH.questions]
    }
  } else {
    return {
      id: 'sbf-see',
      variant: variant,
      displayName: 'SBF See',
      configuration: 'Ohne Basisteil',
      description: 'Der SBF See ist ein super toller Schein',
      questions: SBF_SEE_SPEZIFISCH.questions
    }
  }
}
