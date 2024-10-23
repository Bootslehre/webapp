import * as jsdom from 'jsdom';
import type { Questionaire, Question } from '../src/types';
import { join } from 'path';

const QUESTIONAIRES: Array<Questionaire> = [
  {
    id: 'SBF',
    src: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Basisfragen/Basisfragen-node.html',
  },
  {
    id: 'SBF_BINNEN',
    src: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Spezifische-Fragen-Binnen/Spezifische-Fragen-Binnen-node.html',
  },
  {
    id: 'SBF_BINNEN_SEGEL',
    src: 'https://www.elwis.de/DE/Sportschifffahrt/Sportbootfuehrerscheine/Fragenkatalog-Binnen/Spezifische-Fragen-Segeln/Spezifische-Fragen-Segeln-node.html',
  },
];

async function extractQuestionsFromQuestionaire(questionaire: Questionaire) {
  const questions: Array<Question> = [];

  const file = await fetch(questionaire.src);
  const html = await file.text();
  const dom = new jsdom.JSDOM(html);

  const paragraphs = Array.from(dom.window.document.querySelectorAll('#content p')) as Array<HTMLParagraphElement>;

  paragraphs.forEach((paragraph) => {
    const text = paragraph?.textContent?.replace(/\n/g, '')?.trim() ?? '';

    if (!text) {
      return;
    }

    const [id, ...parts] = text.split('. ');

    const question: Question = {
      id,
      text: parts.join('. '),
      media: [],
      answers: [],
    };

    // start iterating over following siblings...
    let el = paragraph.nextElementSibling;

    while (true) {
      if (!el) {
        break;
      }

      // extract answers and ABORT
      if (el?.tagName === 'OL') {
        question.answers = Array.from(el.querySelectorAll('li')).map((li, index) => ({
          text: li?.textContent?.trim() ?? '',
          isCorrect: index === 0,
        }));

        break;
      }

      // extract image data
      const images: Array<HTMLImageElement> =
        el.tagName === 'IMG' ? [el as HTMLImageElement] : Array.from(el.querySelectorAll('img'));

      images
        .filter((img) => Boolean(img.getAttribute('src')))
        .forEach((img) => {
          question.media.push({
            alt: img.getAttribute('alt') ?? '',
            title: img.getAttribute('title') ?? '',
            src: img.getAttribute('src') ?? '',
          });
        });

      // continue with next sibling
      el = el.nextElementSibling;
    }

    if (!question.answers?.length || !question.id || !question.text) {
      return;
    }

    questions.push(question as Question);
  });

  Bun.write(
    join('src', 'generated', 'questionaires', `${questionaire.id}.ts`),
    `export const ${questionaire.id} = ${JSON.stringify(questions, null, 2)};\n`,
  );
}

QUESTIONAIRES.forEach(async (questionaire) => {
  console.log(`processing ${questionaire.id}...`);
  await extractQuestionsFromQuestionaire(questionaire);
});
