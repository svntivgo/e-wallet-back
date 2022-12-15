import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class createMovementDto {
  @ApiProperty({
    example: 'UUID',
    description: 'Accounts ID where amount will go.',
  })
  @Field(() => String, { description: 'Accounts ID where amount will go.' })
  idIncome: string;

  @ApiProperty({
    example: 'UUID',
    description: 'Accounts ID where amount goes out.',
  })
  @Field(() => String, { description: 'Accounts ID where amount goes out.' })
  idOutcome: string;

  @ApiProperty({
    example: 'Dinner at Moes restaurant',
    description: 'A string that describes de movement.',
  })
  @Field(() => String, { description: 'A string that describes de movement.' })
  reason: string;

  @ApiProperty({ example: '130000', description: 'Amount of money.' })
  @Field(() => Int, { description: 'Amount of money.' })
  amount: number;
}
