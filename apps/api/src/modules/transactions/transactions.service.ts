import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { ServiceResponse } from '~/shared/types';
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from '../auth/errors/auth.errors';
import { ListUserTransactionsDTO } from './dto/list-user-transactions.dto';
import { readUploadedFile } from './helpers/fileUpload.helper';
import { formatTransactionsFile } from './helpers/transactions.helper';

type UploadOutput = {
  inserted: number;
  skipped: number;
};
@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async importTransactions(
    filename: string,
    userId: string,
  ): Promise<ServiceResponse<UploadOutput, InvalidCredentialsError>> {
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

  async listUserTransactions(dto: ListUserTransactionsDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        data: null,
        error: new UserNotFoundError(),
      };
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      take: dto.limit || 10,
      skip: dto.offset * dto.limit || 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = await this.prisma.transaction.count({
      where: {
        userId: user.id,
      },
    });

    const totalPages = Math.ceil(count / dto.limit);

    return {
      data: {
        totalPages,
        transactions,
      },
    };
  }
}
