import { SBF_SEE_BASIS, SBF_SEE_SPEZIFISCH } from '../../../static/generated';
import type { Questionaire, SbfSeeVariant } from '../../utils/licenses';

export function getQuestionaire(variant: SbfSeeVariant): Questionaire {
  if (variant === 'SBF_SEE_KOMPLETT') {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Der SBF See ist ein super toller Schein',
      questions: [...SBF_SEE_BASIS, ...SBF_SEE_SPEZIFISCH],
    };
  } else {
    return {
      id: 'sbfSee',
      displayName: 'SBF See',
      description: 'Der SBF See ist ein super toller Schein',
      questions: SBF_SEE_SPEZIFISCH,
    };
  }
}
