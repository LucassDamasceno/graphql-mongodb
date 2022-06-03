import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  jwtAccessTokenSecret: string;
  passwordSaltRounds: number;

  constructor(private nestConfig: NestConfigService) {
    this.jwtAccessTokenSecret = this.nestConfig.get('JWT_ACCESS_TOKEN_SECRET');
    this.passwordSaltRounds = Number(
      this.nestConfig.get('PASSWORD_SALT_ROUNDS'),
    );
  }
}
