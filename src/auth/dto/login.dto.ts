import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @Length(8, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}