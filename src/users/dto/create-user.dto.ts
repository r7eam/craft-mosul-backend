import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(8, 20)
  phone: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsIn(['client', 'worker'])
  role: 'client' | 'worker';

  @IsOptional()
  neighborhood_id?: number;

  @IsOptional()
  profile_image?: string;
}
