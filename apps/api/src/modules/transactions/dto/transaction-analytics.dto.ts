import { ApiProperty } from '@nestjs/swagger';

export class GetAnalyticsResponse {
  @ApiProperty({
    name: 'paidComission',
    description: 'Amount of comissions that were paid',
    type: Number,
    required: true,
    example: 3000,
  })
  paidCommission: number;

  @ApiProperty({
    name: 'receivedComission',
    description: 'Amount of comissions that were received',
    type: Number,
    required: true,
    example: 3000,
  })
  receivedComission: number;

  @ApiProperty({
    name: 'affiliateSales',
    description: 'Amount of sales from affiliates',
    type: Number,
    required: true,
    example: 3000,
  })
  affiliateSales: number;

  @ApiProperty({
    name: 'producerSales',
    description: 'Amount of comissions from producers',
    type: Number,
    required: true,
    example: 3000,
  })
  producerSales: number;
}
