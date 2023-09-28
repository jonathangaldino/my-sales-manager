import { INestApplication } from '@nestjs/common';

export const setupCors = (app: INestApplication<any>) => {
  const isDev =
    process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';

  console.log({ isDev });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
};
