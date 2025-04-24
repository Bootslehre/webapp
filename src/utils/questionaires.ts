import {
  SBF_BINNEN_BASIS,
  SBF_BINNEN_SEGEL,
  SBF_BINNEN_SPEZIFISCH,
  SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH
} from '../../static/generated';

export const QUESTIONAIRES = [SBF_BINNEN_BASIS, SBF_BINNEN_SEGEL, SBF_BINNEN_SPEZIFISCH, SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH];

export const questionaireNameMap: Record<string, string> = {
  [SBF_BINNEN_BASIS.id]: "Binnen Basis",
  [SBF_BINNEN_SEGEL.id]: "Binnen Segel",
  [SBF_BINNEN_SPEZIFISCH.id]: "Binnen Spezifisch",
  [SBF_SEE_BASIS.id]: "See Basis",
  [SBF_SEE_SPEZIFISCH.id]: "See Spezifisch",
}