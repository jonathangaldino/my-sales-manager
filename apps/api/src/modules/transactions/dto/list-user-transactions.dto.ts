import { ApiProperty } from '@nestjs/swagger';

export class ListUserTransactionsDTO {
  limit: number;
  offset: number;
  userId: string;
}

export class APITransaction {
  @ApiProperty({
    name: 'amount',
    description: 'Formatted amount in R$',
    type: String,
    example: 'R$ 100,00',
  })
  amount: string;

  @ApiProperty({
    name: 'date',
    description: 'Date of sell in the following format: DD/MM/YY',
    type: String,
    example: '29/09/23',
  })
  date: string;

  @ApiProperty({
    name: 'id',
    description: 'UUID of this resource.',
    type: String,
    example: 'adsadadasdsa',
  })
  id: string;

  @ApiProperty({
    name: 'type',
    description: 'Type of the operation',
    type: String,
    examples: ['1', '2', '3', '4'],
  })
  type: number;

  @ApiProperty({
    name: 'product',
    description: 'Name of the product.',
    type: String,
    example: 'DESENVOLVEDOR FULL STACK',
  })
  product: string;

  @ApiProperty({
    name: 'seller',
    description: 'Name of the seller who did this operation',
    type: String,
    example: 'ELIANA NOGUEIRA',
  })
  seller: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the operation.',
    type: String,
    examples: [
      'Venda afiliado',
      'Comissão recebida',
      'Venda produtor',
      'Comissão paga',
    ],
  })
  description: string;

  @ApiProperty({
    name: 'nature',
    description: 'Nature of the operation.',
    type: String,
    examples: ['Entrada', 'Saída'],
  })
  nature: string;

  @ApiProperty({
    name: 'signal',
    description: 'Signal of the operation. Available: + or -',
    type: String,
    example: '+',
  })
  signal: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Timestamp of when this resource was created',
    type: String,
    example: 'R$ 100,00',
  })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: 'Timestamp of when this resource was last updated',
    type: String,
    example: 'R$ 100,00',
  })
  updatedAt: Date;
}
export class ListUserTransactionsResponse {
  @ApiProperty({
    name: 'totalPages',
    description: 'Total pages available for pagination.',
    type: Number,
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    name: 'transactions',
    description: 'List of transactions',
    type: APITransaction,
    isArray: true,
  })
  transactions: APITransaction[];
}
