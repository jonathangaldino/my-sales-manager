import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthModule } from './auth.module';

describe('Auth Controller', () => {
  let app: INestApplication<NestExpressApplication>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /auth', () => {
    it('returns error if body is empty', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth')
        .send({});

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('returns error if body is missing email', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth')
        .send({
          password: 'my-password',
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('returns error if body is missing password', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth')
        .send({
          email: 'jonathan@gmail.com',
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('should return 201', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth')
        .send({
          email: 'jonathan@gmail.com',
          password: 'my-new-password',
        });

      expect(status).toBe(201);
      expect(body).toHaveProperty('token', expect.any(String));
    });
  });

  describe('POST /auth/login', () => {
    it('returns error if body is empty', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({});

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('returns error if body is missing email', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: 'my-password',
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('returns error if body is missing password', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jonathan@gmail.com',
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty(
        'message',
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('should return 422 if account does not exists', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jonatha@gmail.com',
          password: 'my-new-password',
        });

      expect(status).toBe(422);
      expect(body).toHaveProperty('message', expect.any(String));
    });

    it('should return 422 if password is invalid', async () => {
      // create the account
      await request(app.getHttpServer()).post('/auth').send({
        email: 'jonathan@gmail.com',
        password: 'my-new-password',
      });

      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jonathan@gmail.com',
          password: 'my-ne-password',
        });

      expect(status).toBe(422);
      expect(body).toHaveProperty('message', expect.any(String));
    });

    it('should return 201', async () => {
      // create the account
      await request(app.getHttpServer()).post('/auth').send({
        email: 'jonathan@gmail.com',
        password: 'my-new-password',
      });

      const { status, body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jonathan@gmail.com',
          password: 'my-new-password',
        });

      expect(status).toBe(201);
      expect(body).toHaveProperty('token', expect.any(String));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
