import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { defaultUnauthorized } from '../auth/auth.decorators';
import { ListUserTransactionsResponse } from './dto/list-user-transactions.dto';
import { GetAnalyticsResponse } from './dto/transaction-analytics.dto';

/**
 * Swagger documentation for the endpoint: POST /transctions/upload
 * @returns void
 */
export function UploadTransactionsApiDocs() {
  return applyDecorators(
    ApiTags('transactions'),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'The file with the transactions to import.',
      schema: {
        type: 'object',
        required: ['file'],
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description:
        'How many data was inserted and skipped in case of duplicates',
      schema: {
        type: 'object',
        properties: {
          inserted: {
            type: 'number',
            example: 30,
          },
          skipped: {
            type: 'number',
            example: 2,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'In case of invalid or missing authentication bearer token',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'String',
            example: 'Unauthorized',
          },
        },
      },
    }),
    defaultUnauthorized(),
  );
}

/**
 * Swagger documentation for the endpoint: GET /transctions
 * @returns void
 */
export function GetTransactinsApiDocs() {
  return applyDecorators(
    ApiTags('transactions'),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      type: ListUserTransactionsResponse,
    }),
  );
}

export function GetAnalyticsApiDocs() {
  return applyDecorators(
    ApiTags('transactions'),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      type: GetAnalyticsResponse,
    }),
  );
}
