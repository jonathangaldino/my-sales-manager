import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { readTestFile } from './helpers/fileUpload.helper';
import { TransactionsModule } from './transactions.module';

describe('TransactionsController', () => {
  let app: INestApplication<NestExpressApplication>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransactionsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should upload file', async () => {
    const fileBuffer = await readTestFile();

    const { status } = await request(app.getHttpServer())
      .post('/transactions/upload')
      .attach('file', fileBuffer, 'custom_file_name.txt');

    expect(status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
