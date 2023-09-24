import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { readTestFile } from './helpers/fileUpload.helper';
import { TransactionsModule } from './transactions.module';

describe('TransactionsController', () => {
  let app: INestApplication<NestExpressApplication>;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransactionsModule, AuthModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const { body, status } = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'jonathan@gmail.com',
        password: 'my-new-password',
      });

    expect(status).toBe(201);

    token = body.token;
  });

  it('should upload file', async () => {
    const fileBuffer = await readTestFile();

    const { status, body } = await request(app.getHttpServer())
      .post('/transactions/upload')
      .set('authorization', `Bearer ${token}`)
      .attach('file', fileBuffer, 'custom_file_name.txt');

    expect(status).toBe(201);
    expect(body).toHaveProperty(
      'message',
      expect.stringMatching('Transactions imported'),
    );
  });

  it('should return 401 if bearer token is missing', async () => {
    const fileBuffer = await readTestFile();

    const { status, body } = await request(app.getHttpServer())
      .post('/transactions/upload')
      .set('authentication', `Bearer`)

      .attach('file', fileBuffer, 'custom_file_name.txt');

    expect(status).toBe(401);
    expect(body).toHaveProperty(
      'message',
      expect.stringMatching('Unauthorized'),
    );
  });

  it('should return 401 if bearer token is invalid', async () => {
    const fileBuffer = await readTestFile();

    const { status, body } = await request(app.getHttpServer())
      .post('/transactions/upload')
      .set('authentication', `Bearer invalid-token`)

      .attach('file', fileBuffer, 'custom_file_name.txt');

    expect(status).toBe(401);
    expect(body).toHaveProperty(
      'message',
      expect.stringMatching('Unauthorized'),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
