import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateProfessionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}