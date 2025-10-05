import { IsString, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;
}