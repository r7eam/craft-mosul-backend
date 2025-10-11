import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsIn, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'أحمد علي محمد'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'ahmed@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '07901234567',
    minLength: 8,
    maxLength: 20
  })
  @IsString()
  @Length(8, 20)
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
    maxLength: 255
  })
  @IsString()
  @Length(6, 255)
  password: string;

  @ApiProperty({
    description: 'User role',
    example: 'client',
    enum: ['client', 'worker', 'admin']
  })
  @IsIn(['client', 'worker', 'admin'])
  role: 'client' | 'worker' | 'admin';

  @ApiProperty({
    description: 'Neighborhood ID where user lives',
    example: 1,
    required: false
  })
  @IsOptional()
  neighborhood_id?: number;

  @ApiProperty({
    description: 'Profile image URL',
    example: '/uploads/profiles/user-profile-123.jpg',
    required: false
  })
  @IsOptional()
  profile_image?: string;

  @ApiProperty({
    description: 'Email verification status',
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;

  @ApiProperty({
    description: 'Phone verification status',
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  phone_verified?: boolean;

  @ApiProperty({
    description: 'User active status',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
