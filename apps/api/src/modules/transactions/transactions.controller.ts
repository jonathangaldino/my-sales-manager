import {
  Controller,
  Get,
  HttpStatus,
  Post,
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
import { AuthGuard } from '../auth/guards/auth.guard';
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
  @Get('/')
  getTransactions() {
    return {};
  }
}
