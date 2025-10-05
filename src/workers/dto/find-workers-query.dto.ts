import { IsOptional, IsString, IsNumber, IsBoolean, IsIn, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindWorkersQueryDto {
  // Filters
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profession_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  neighborhood_id?: number;

  @IsOptional()
  @IsString()
  @IsIn(['الساحل الأيمن', 'الساحل الأيسر'])
  area?: 'الساحل الأيمن' | 'الساحل الأيسر';

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_available?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  min_rating?: number;

  @IsOptional()
  @IsString()
  search?: string; // Search in name, bio

  // Sorting
  @IsOptional()
  @IsString()
  @IsIn(['rating', 'experience', 'jobs', 'recent', 'name'])
  sort?: 'rating' | 'experience' | 'jobs' | 'recent' | 'name';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  // Pagination
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}