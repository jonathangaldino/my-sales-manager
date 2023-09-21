import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchemaForEnv } from './config/environment-variables';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    PersistenceModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
