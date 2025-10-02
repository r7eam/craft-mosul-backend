import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateNeighborhoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  area: string;
}