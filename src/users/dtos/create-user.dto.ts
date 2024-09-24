import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'user', 'guest'], {
    message: 'role must be one of the following values: admin, user, guest',
  })
  role: 'admin' | 'user' | 'guest';
}
