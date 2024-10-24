import fs, { existsSync } from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

export async function downloadFromUrl(url: string, filePath: string) {
  if (existsSync(filePath)) {
    return;
  }

  const { body } = await fetch(url);
  const fileStream = fs.createWriteStream(filePath, { flags: 'wx' });
  await finished(Readable.fromWeb(body).pipe(fileStream));
}

export const runInBand = async <T, K>(iterable: Array<T>, fn: (item: T) => Promise<K>) => {
  const results = [];

  for (const x of iterable) {
    results.push(await fn(x));
  }

  return results;
};

export async function getHtmlForUrl(url: string) {
  const file = await fetch(url);
  return await file.text();
}
