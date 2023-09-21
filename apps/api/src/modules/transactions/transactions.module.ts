import { Module } from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma/prisma.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService],
})
export class TransactionsModule {}
