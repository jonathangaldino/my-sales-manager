import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { readUploadedFile } from './helpers/fileUpload.helper';
import { formatTransactionsFile } from './helpers/transactions.helper';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async importTransactions(filename: string) {
    const fileContent = await readUploadedFile(filename);

    const transactions = fileContent.split(/\r?\n/);

    const transactionsFormatted = formatTransactionsFile(transactions);

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
