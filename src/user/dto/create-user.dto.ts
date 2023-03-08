import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly full_name: string;

  @IsNotEmpty()
  readonly cpf: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
