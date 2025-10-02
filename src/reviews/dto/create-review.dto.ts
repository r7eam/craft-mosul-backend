import { IsNumber, IsPositive, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsPositive()
  request_id: number;

  @IsNumber()
  @IsPositive()
  worker_id: number;

  @IsNumber()
  @IsPositive()
  client_id: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}