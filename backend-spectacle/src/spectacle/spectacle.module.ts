import { ConfigModule } from '../config/config.module';
import { forwardRef, Module } from '@nestjs/common';
import { SpectacleService } from './spectacle.service';
import { SpectacleResolver } from './spectacle.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Spectacle, SpectacleSchema } from './spectacle.schema';
import { ValidateSpectacleId } from './spectacle.validator';
import { ReservationModule } from 'src/reservation/reservation.module';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Spectacle.name, schema: SpectacleSchema },
    ]),
    forwardRef(() => ReservationModule),
  ],
  providers: [SpectacleService, SpectacleResolver, ValidateSpectacleId],
  exports: [SpectacleService, ValidateSpectacleId],
})
export class SpectacleModule {}
