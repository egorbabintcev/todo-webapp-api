import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }
}
