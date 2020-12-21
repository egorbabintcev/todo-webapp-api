import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @Matches(/^[a-z0-9_-]+$/gim, {
    message: 'Login must contain letter, digits, _ and - characters',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S*$/gm, {
    message: 'Password must contain letters, digits and special characters',
  })
  password: string;
}
