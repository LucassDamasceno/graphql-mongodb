import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/decorators/public';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const res = await this.authService.login(req.user);
    response.cookie('token', res.accessToken);
    return res;
  }
}
