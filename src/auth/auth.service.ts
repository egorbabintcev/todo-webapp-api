import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { _id, username } = user;
      return Object.assign({}, { _id, username });
    }
    return null;
  }

  async login(user: any) {
    const { username, _id } = user;
    const payload = { username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
