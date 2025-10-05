import { IsIn, IsString, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateRequestStatusDto {
  @IsIn(['pending', 'accepted', 'rejected', 'completed', 'cancelled'])
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

  @ValidateIf(o => o.status === 'rejected')
  @IsString()
  @IsNotEmpty()
  rejected_reason?: string;
}