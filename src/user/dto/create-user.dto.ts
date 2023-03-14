import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly full_name: string;

  @IsNotEmpty()
  @Length(11)
  readonly cpf: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
