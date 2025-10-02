import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNeighborhoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  area: string;
}