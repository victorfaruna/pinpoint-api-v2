import { IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  code: string;
}

export class SendVerificationCodeDto {
  @IsString()
  @IsEmail()
  email: string;
}
