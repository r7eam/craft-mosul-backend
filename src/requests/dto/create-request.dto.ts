import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsIn } from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @IsPositive()
  client_id: number;

  @IsNumber()
  @IsPositive()
  worker_id: number;

  @IsString()
  @IsNotEmpty()
  problem_description: string;

  @IsOptional()
  @IsIn(['pending', 'accepted', 'rejected', 'completed', 'cancelled'])
  status?: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

  @IsOptional()
  @IsString()
  rejected_reason?: string;
}