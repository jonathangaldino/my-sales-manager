import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    name: 'email',
    description: "User's email",
    type: String,
    required: true,
    example: 'user@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    description: "User's password",
    type: String,
    required: true,
    example: 'my-password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
