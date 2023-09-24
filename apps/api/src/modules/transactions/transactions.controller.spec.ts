import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { readTestFile } from './helpers/fileUpload.helper';
import { TransactionsModule } from './transactions.module';

const createTestingModule = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [TransactionsModule, AuthModule],
    providers: [PrismaService, AuthService],
  }).compile();

  const app = moduleRef.createNestApplication();

  return app;
};

const getToken = async (
  app: INestApplication<NestExpressApplication>,
  email?: string,
) => {
  const { body, status } = await request(app.getHttpServer())
    .post('/auth')
    .send({
      email: email || 'jonathan@gmail.com',
      password: 'my-new-password',
    });

  expect(status).toBe(201);
  expect(body).toHaveProperty('token', expect.any(String));

  return body.token;
};

describe('TransactionsController', () => {
  let app: INestApplication<NestExpressApplication>;
  let token: string;
  let fileBuffer;

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();

    token = await getToken(app);

    fileBuffer = await readTestFile();

    uploadTransactions(token);
  });

  const uploadTransactions = async (bearerToken: string) => {
    const { status, body } = await request(app.getHttpServer())
      .post('/transactions/upload')
      .set('authorization', `Bearer ${bearerToken}`)
      .attach('file', fileBuffer, 'custom_file_name.txt');

    expect(status).toBe(201);
    expect(body).toHaveProperty(
      'message',
      expect.stringMatching('Transactions imported'),
    );
  };

  describe('POST /transactions/upload', () => {
    it('should return 401 if bearer token is missing', async () => {
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
  });

  describe('GET /transactions', () => {
    let token: string;

    beforeAll(async () => {
      token = await getToken(app, 'newaccount@gmail.com');
      await uploadTransactions(token);
    });

    const getTransactions = async ({
      validate = false,
      limit = 10,
      offset = 0,
    }) => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/transactions?limit=${limit}&offset=${offset}`)
        .set('authorization', `Bearer ${token}`)
        .send();

      if (validate) {
        expect(status).toBe(200);
        expect(body).toHaveProperty('transactions', expect.any(Array));
      }

      return { body, status };
    };

    it('return 200 with a list of transactions of the user', async () => {
      await getTransactions({ validate: true });
    });

    it('returns totalPages correctly using basic seed', async () => {
      // We have 20 items in total
      // Taking 10 items should return 2 pages?

      const { body } = await getTransactions({
        validate: true,
        limit: 10,
        offset: 0,
      });

      expect(body).toHaveProperty('totalPages', 2);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
