import { ApiProperty } from '@nestjs/swagger';

export class createMovementDto {
  @ApiProperty({
    example: 'UUID',
    description: 'Accounts ID where amount will go.',
  })
  idIncome: string;

  @ApiProperty({
    example: 'UUID',
    description: 'Accounts ID where amount goes out.',
  })
  idOutcome: string;

  @ApiProperty({
    example: 'Dinner at Moes restaurant',
    description: 'A string that describes de movement.',
  })
  reason: string;

  @ApiProperty({ example: '130000', description: 'Amount of money.' })
  amount: number;
}
