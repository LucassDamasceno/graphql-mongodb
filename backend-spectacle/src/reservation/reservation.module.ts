import { ConfigModule } from './../config/config.module';
import { forwardRef, Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.schema';
import { SpectacleModule } from 'src/spectacle/spectacle.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    forwardRef(() => SpectacleModule),
  ],
  providers: [ReservationService, ReservationResolver],
  exports: [ReservationService],
})
export class ReservationModule {}
