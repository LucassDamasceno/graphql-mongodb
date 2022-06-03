import { ConfigService } from './config.service';
import { checkConfiguration } from './../utils/config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './configuration';

@Module({
  imports: [NestConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  constructor() {
    checkConfiguration(configuration());
  }
}
