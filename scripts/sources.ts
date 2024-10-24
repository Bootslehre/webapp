import type { QuestionaireSource } from '../src/types';

export const QUESTIONAIRE_SOURCES: Array<QuestionaireSource> = [
  {
    id: 'SBF',
    url: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Basisfragen/Basisfragen-node.html',
  },
  {
    id: 'SBF_BINNEN',
    url: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Spezifische-Fragen-Binnen/Spezifische-Fragen-Binnen-node.html',
  },
  {
    id: 'SBF_BINNEN_SEGEL',
    url: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Spezifische-Fragen-Segeln/Spezifische-Fragen-Segeln-node.html',
  },
];
