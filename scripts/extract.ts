import fs, { mkdirSync, rmdirSync } from 'fs';
import jsdom from 'jsdom';
import { dirname, join } from 'path';
import { chdir } from 'process';
import { fileURLToPath } from 'url';
import { type Media, type Question, type Questionaire, type QuestionaireSource } from '../src/types';
import { QUESTIONAIRE_SOURCES } from './sources';
import { downloadFromUrl, getHtmlForUrl, runInBand } from './utils';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory


async function processSource(source: QuestionaireSource) {
  console.log(`processing ${source.id}...`);

  const dir = join(__dirname, '..', 'generated', source.id);
  clearDirectory(dir);
  chdir(dir);

  const html = await getHtmlForUrl(source.url);
  const dom = new jsdom.JSDOM(html);
  const paragraphs = Array.from(dom.window.document.querySelectorAll('#content p')) as Array<HTMLParagraphElement>;

  const questions = await runInBand(paragraphs, processParagraph);
  const validQuestions = questions.filter(Boolean) as Array<Question>;
  const questionaire: Questionaire = { id: source.id, questions: validQuestions };

  fs.writeFileSync(`index.ts`, `export const ${questionaire.id} = ${JSON.stringify(questionaire, null, 2)};\n`);

  return questionaire;
}

async function processParagraph(paragraph: HTMLParagraphElement): Promise<Question | undefined> {
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

    // extract answers and ABORT because next question has been processed completely
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
    const processedImages = await runInBand(images, processImage);
    const validProcessedImages = processedImages.filter(Boolean) as Array<Media>;
    question.media.push(...validProcessedImages);

    // continue with next sibling
    el = el.nextElementSibling;
  }

  if (!question.answers?.length || !question.id || !question.text) {
    return;
  }

  return question;
}

async function processImage(image: HTMLImageElement): Promise<Media | undefined> {
  const media = getImageMedia(image);

  if (!media) {
    return;
  }

  const fileName = media.src.split('/').at(-1)?.split('?').at(0);

  if (!fileName) {
    return;
  }

  await downloadFromUrl(media.src, fileName);

  return media;
}

function getImageMedia(img: HTMLImageElement): Media | undefined {
  const src = img.getAttribute('src') ?? '';
  const alt = img.getAttribute('alt') ?? '';
  const title = img.getAttribute('title') ?? '';

  if (!src) {
    return undefined;
  }

  return { alt, title, src };
}

function clearDirectory(dir: string) {
  if (fs.existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
  }

  mkdirSync(dir);
}

// ...
// ...
// ...

const questionaires = await runInBand(QUESTIONAIRE_SOURCES, processSource);
const indexFileContent = questionaires.map((q) => `export * from './${q.id}';`).join('\n') + '\n';
fs.writeFileSync(join(__dirname, '..', 'generated', 'index.ts'), indexFileContent);
