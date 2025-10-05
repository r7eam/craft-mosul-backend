import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  newPassword: string;
}