import { IsEmail, IsOptional, IsStrongPassword, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly full_name: string;

  @IsOptional()
  @Length(11)
  readonly cpf: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsStrongPassword()
  readonly password: string;
}
