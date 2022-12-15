import { ApiProperty } from '@nestjs/swagger';

export class createClientDto {
  @ApiProperty({ example: 'John Doe', description: 'Clients fullname' })
  fullName: string;
  @ApiProperty({ example: 'john@email.com', description: 'Clients email' })
  email: string;
  @ApiProperty({ example: '3101234567', description: 'Clients phone number' })
  phone: string;
  @ApiProperty({
    example: 'http://www.img.com/photo.jpg',
    description: 'Clients photo url',
  })
  photo: string;
  @ApiProperty({ example: 'password', description: 'Clients password' })
  password: string;
}
