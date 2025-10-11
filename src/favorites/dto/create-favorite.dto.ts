import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'Client ID (will be set from authentication)',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  client_id: number;

  @ApiProperty({
    description: 'Worker ID to add to favorites',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  worker_id: number;
}