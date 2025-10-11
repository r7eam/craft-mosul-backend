import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsIn, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'محمد حسن علي',
    minLength: 2,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    description: 'Email address (optional)',
    example: 'mohammed@example.com',
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
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;

  @ApiProperty({
    description: 'User role',
    example: 'worker',
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
  @IsNumber()
  @IsPositive()
  neighborhood_id?: number;

  @ApiProperty({
    description: 'Profile image URL',
    example: '/uploads/profiles/user-profile-123.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  profile_image?: string;

  // Additional fields for worker registration
  @ApiProperty({
    description: 'Profession ID (required for worker role)',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  profession_id?: number;

  @ApiProperty({
    description: 'Worker bio/description',
    example: 'كهربائي محترف مع خبرة 5 سنوات في صيانة وتركيب الأجهزة الكهربائية',
    required: false
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Years of experience',
    example: 5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  experience_years?: number;

  @ApiProperty({
    description: 'Contact phone number',
    example: '07901234567',
    required: false,
    minLength: 8,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  contact_phone?: string;

  @ApiProperty({
    description: 'WhatsApp number',
    example: '07901234567',
    required: false,
    minLength: 8,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  whatsapp_number?: string;
}