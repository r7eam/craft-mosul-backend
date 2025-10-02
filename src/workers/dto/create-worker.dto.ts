import { IsNotEmpty, IsOptional, IsString, IsNumber, IsPositive, IsBoolean, IsUrl, Length } from 'class-validator';

export class CreateWorkerDto {
  @IsNumber()
  @IsPositive()
  user_id: number;

  @IsNumber()
  @IsPositive()
  profession_id: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  experience_years?: number;

  // Contact information
  @IsOptional()
  @IsString()
  @Length(8, 20)
  contact_phone?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  whatsapp_number?: string;

  @IsOptional()
  @IsUrl()
  facebook_url?: string;

  @IsOptional()
  @IsUrl()
  instagram_url?: string;

  // Status
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}