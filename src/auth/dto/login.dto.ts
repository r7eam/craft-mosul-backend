import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User phone number (alternative to email)',
    example: '07901234567',
    required: false,
    minLength: 8,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  phone?: string;

  @ApiProperty({
    description: 'User email address (alternative to phone)',
    example: 'mohammed@example.com',
    required: false
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}