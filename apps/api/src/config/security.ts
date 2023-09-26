import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const setupHelmet = (app: INestApplication<any>) => {
  app.use(helmet({}));
};
