import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomBytes } from 'crypto';
import { readFile } from 'fs/promises';
import multer from 'multer';
import { resolve } from 'path';
import { exit } from 'process';

export const testFilePath = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'sales.txt',
);
export const tmpFolder = resolve(__dirname, 'uploads');

export const storageOptions: MulterOptions = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export const readTestFile = (): Promise<Buffer> => {
  // console.log(`Opening test file: `, testFilePath);

  try {
    const fileBuffer = readFile(testFilePath);
    return fileBuffer;
  } catch (err) {
    console.error('Error while reading test file: ', err);
    exit(1);
  }
};

export const readUploadedFile = (filename: string) => {
  return readFile(tmpFolder + '/' + filename, 'utf-8');
};
