import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class createClientDto {
  @ApiProperty({ example: 'John Doe', description: 'Clients fullname' })
  @Field(() => String, { description: 'Clients fullname' })
  fullName: string;

  @ApiProperty({ example: 'john@email.com', description: 'Clients email' })
  @Field(() => String, { description: 'Clients email' })
  email: string;

  @ApiProperty({ example: '3101234567', description: 'Clients phone number' })
  @Field(() => String, { description: 'Clients phone number' })
  phone: string;

  @ApiProperty({
    example: 'http://www.img.com/photo.jpg',
    description: 'Clients photo url',
  })
  @Field(() => String, { description: 'Clients photo url' })
  photo: string;

  @ApiProperty({ example: 'password', description: 'Clients password' })
  @Field(() => String, { description: 'Clients password' })
  password: string;
}
