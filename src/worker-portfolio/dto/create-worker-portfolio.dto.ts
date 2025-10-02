import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateWorkerPortfolioDto {
  @IsNumber()
  @IsPositive()
  worker_id: number;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsOptional()
  @IsString()
  description?: string;
}