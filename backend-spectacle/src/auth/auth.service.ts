import { HttpError } from 'src/utils/error';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new HttpError(
        'There is no existing user record corresponding to the email provided.',
        401,
        'user-not-found',
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new HttpError(
        'Password is incorrect. Please check your password.',
        401,
        'invalid-password',
      );
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, userId: user._id };

    const accessToken = this.jwtService.sign({ ...payload });

    return {
      accessToken,
      user,
    };
  }
}
