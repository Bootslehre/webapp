import type { Questionaire, SbfSeeVariant } from '../../utils/licenses';
import { SBF_SEE_BASIS } from '../../../static/generated/SBF_SEE_BASIS';
import { SBF_SEE_SPEZIFISCH } from '../../../static/generated/SBF_SEE_SPEZIFISCH';

export function getQuestionaire(variant: SbfSeeVariant): Questionaire {
  if (variant === 'SBF_SEE_KOMPLETT') {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Du lernst für den kompletten Sportbootführerschein See',
      questions: [...SBF_SEE_BASIS, ...SBF_SEE_SPEZIFISCH],
    };
  } else {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Du lernst für den Sportbootführerschein See ohne Basisteil',
      questions: SBF_SEE_SPEZIFISCH,
    };
  }
}
