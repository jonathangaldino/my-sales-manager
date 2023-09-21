import {
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import multer from 'multer';
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
  @HttpCode(201)
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const { data, error } = await this.transactionsService.create();
    if (!error) {
      return 'File uploaded';
    } else {
      return 'Wrong way to handle the file';
    }
  }

  @GetTransactinsApiDocs()
  @Get('/')
  getTransactions() {
    return {};
  }
}
