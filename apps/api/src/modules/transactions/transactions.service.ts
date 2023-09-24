import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { InvalidCredentialsError } from '../auth/errors/auth.errors';
import { readUploadedFile } from './helpers/fileUpload.helper';
import { formatTransactionsFile } from './helpers/transactions.helper';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async importTransactions(filename: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        error: new InvalidCredentialsError(),
        data: null,
      };
    }

    const fileContent = await readUploadedFile(filename);

    const transactions = fileContent.split(/\r?\n/);

    const transactionsFormatted = formatTransactionsFile(transactions, user.id);

    try {
      const data = await this.prisma.transaction.createMany({
        data: transactionsFormatted,
        skipDuplicates: true,
      });

      return {
        error: null,
        data: {
          inserted: data.count,
          skipped: transactionsFormatted.length - data.count,
        },
      };
    } catch (error) {
      console.error('Error while bulk creating transactions: ', error);
      return {
        error: new Error('Fail to import transactions'),
        data: null,
      };
    }
  }
}
