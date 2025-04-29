import { SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH } from "../../../static/generated";
import type { EnrichedQuestionaire, SbfSeeVariant } from "../../utils/licenses";

export function getLicenseVariant(variant: SbfSeeVariant): EnrichedQuestionaire {
  if (variant === 'SBF_SEE_KOMPLETT') {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Der SBF See ist ein super toller Schein',
      questions: [...SBF_SEE_BASIS.questions, ...SBF_SEE_SPEZIFISCH.questions],
    };
  } else {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Der SBF See ist ein super toller Schein',
      questions: SBF_SEE_SPEZIFISCH.questions,
    };
  }
}