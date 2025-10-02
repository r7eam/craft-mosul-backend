import { IsNumber, IsPositive } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsPositive()
  client_id: number;

  @IsNumber()
  @IsPositive()
  worker_id: number;
}