import fs, { mkdirSync, rmdirSync } from 'fs';
import jsdom from 'jsdom';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { type Question, type QuestionaireSource } from '../src/types';
import { QUESTIONAIRE_SOURCES } from './sources';
import { downloadFromUrl, getHtmlForUrl, runInBand } from './utils';

export interface Media {
  src: string;
  fileName: string;
  title: string;
  alt: string;
}

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory
const generatedDir = join(__dirname, '..', 'static', 'generated');
const assetsDir = join(__dirname, '..', 'static', 'generated', 'assets');

async function processSource(source: QuestionaireSource) {
  console.log(`processing ${source.id}...`);
  const fileName = join(__dirname, '..', 'static', 'generated', `${source.id}.ts`);

  if (fs.existsSync(fileName)) {
    fs.rmSync(fileName);
  }

  const html = await getHtmlForUrl(source.url);
  const dom = new jsdom.JSDOM(html);
  const paragraphs = Array.from(dom.window.document.querySelectorAll('#content p')) as Array<HTMLParagraphElement>;

  const questions = await runInBand(paragraphs, processParagraph);
  const validQuestions = questions.filter(Boolean) as Array<Question>;

  fs.writeFileSync(fileName, `export const ${source.id} = ${JSON.stringify(validQuestions, null, 2)};\n`);
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
    images: [],
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
        id: `${id}_${index + 1}`,
        text: li?.textContent?.trim() ?? '',
      }));

      break;
    }

    // extract image data
    const images: Array<HTMLImageElement> = el.tagName === 'IMG' ? [el as HTMLImageElement] : Array.from(el.querySelectorAll('img'));
    const processedImages: Array<string> = await runInBand(images, processImage);
    const validProcessedImages = processedImages.filter(Boolean) as Array<string>;
    question.images.push(...validProcessedImages);

    // continue with next sibling
    el = el.nextElementSibling;
  }

  if (!question.answers?.length || !question.id || !question.text) {
    return;
  }

  return question;
}

async function processImage(image: HTMLImageElement): Promise<string | undefined> {
  const media = getImageMedia(image);

  if (!media) {
    return;
  }

  await downloadFromUrl(media.src, join(assetsDir, media.fileName));

  return media.fileName;
}

function getImageMedia(img: HTMLImageElement): Media | undefined {
  const src = img.getAttribute('src') ?? '';
  const alt = img.getAttribute('alt') ?? '';
  const title = img.getAttribute('title') ?? '';
  const fileName = src.split('/').at(-1)?.split('?').at(0);

  if (!src || !fileName) {
    return undefined;
  }

  return { alt, title, src, fileName };
}

function clearDirectory() {
  if (fs.existsSync(generatedDir)) {
    rmdirSync(generatedDir, { recursive: true });
  }

  mkdirSync(generatedDir);

  if (fs.existsSync(assetsDir)) {
    rmdirSync(assetsDir, { recursive: true });
  }

  mkdirSync(assetsDir);
}

// ...
// ...
// ...

clearDirectory();
await runInBand(QUESTIONAIRE_SOURCES, processSource);
