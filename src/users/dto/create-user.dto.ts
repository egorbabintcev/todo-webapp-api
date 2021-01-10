import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Matches(/^[a-z0-9_-]+$/gim, {
    message: 'Login must contain letter, digits, _ and - characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S*$/gm, {
    message: 'Password must contain letters, digits and special characters',
  })
  password: string;
}
