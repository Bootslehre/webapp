import {
  SBF_BINNEN_BASIS,
  SBF_BINNEN_SEGEL,
  SBF_BINNEN_SPEZIFISCH,
  SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH
} from '../../static/generated';
import type { Questionaire } from '../types';

interface AdditionalInformation {
  displayName: string;
  description: string;
}

export type EnrichedQuestionaire = Questionaire & AdditionalInformation;

export const QUESTIONAIRES: EnrichedQuestionaire[] = [{
  ...SBF_BINNEN_BASIS,
  displayName: "Binnen Basis",
  description: 'Leck mich fett'
}, {
  ...SBF_BINNEN_SEGEL,
  displayName: "Binnen Segel",
  description: 'Leck mich fett'
}, {
  ...SBF_BINNEN_SPEZIFISCH,
  displayName: "Binnen Spezifisch",
  description: 'Leck mich fett'
}, {
  ...SBF_SEE_BASIS,
  displayName: "See Basis",
  description: 'Leck mich fett'
}, {
  ...SBF_SEE_SPEZIFISCH,
  displayName: "See Spezifisch",
  description: 'Leck mich fett'
}];
