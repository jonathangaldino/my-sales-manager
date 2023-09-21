import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

/**
 * Swagger documentation for the endpoint: POST /transctions/upload
 * @returns void
 */
export function UploadTransactionsApiDocs() {
  return applyDecorators(
    ApiTags('transactions'),
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
  );
}

/**
 * Swagger documentation for the endpoint: GET /transctions
 * @returns void
 */
export function GetTransactinsApiDocs() {
  return applyDecorators(ApiTags('transactions'));
}
