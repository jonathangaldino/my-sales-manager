import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import { Response } from 'express';
import multer from 'multer';
import { UserNotFoundError } from '../auth/errors/auth.errors';
import { AuthGuard } from '../auth/guards/auth.guard';
import { APITransaction } from './dto/list-user-transactions.dto';
import { TransactionEntity } from './entities/transaction.entity';
import {
  GetTransactinsApiDocs,
  UploadTransactionsApiDocs,
} from './transactions.decorators';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UploadTransactionsApiDocs()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads/',
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: Request,
    @Res() res: Response,
  ) {
    const { error, data } = await this.transactionsService.importTransactions(
      file.filename,
      // @ts-expect-error because i didn't type express yet
      req.userId,
    );

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.message,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Transactions imported',
      transactions: data,
    });
  }

  @GetTransactinsApiDocs()
  @UseGuards(AuthGuard)
  @Get('/')
  async getTransactions(
    @Req() req: Request,
    @Res() res: Response,
    @Query('limit') limitQuery?: string,
    @Query('offset') offsetQuery?: string,
  ) {
    const limit = Number(limitQuery || 10);
    const offset = Number(offsetQuery || 0);

    const { error, data } = await this.transactionsService.listUserTransactions(
      {
        limit,
        offset,
        // @ts-expect-error because i didn't type express yet
        userId: req.userId,
      },
    );

    if (error instanceof UserNotFoundError) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }

    return res.status(HttpStatus.OK).json({
      totalPages: data.totalPages,
      transactions: formatTransactions(data.transactions),
    });
  }
}

const parseDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

const formatTransactions = (
  transactions: TransactionEntity[],
): APITransaction[] =>
  transactions.map((transaction) => ({
    ...transaction,
    amount: (transaction.amount / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    date: parseDate(transaction.date),
  }));
