import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateNeighborhoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['الساحل الأيمن', 'الساحل الأيسر'])
  area: 'الساحل الأيمن' | 'الساحل الأيسر';
}