import { CreateReservationDtO } from './dtos/create-reservation';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from './reservation.schema';
import { PubSub } from 'graphql-subscriptions';
import { ReservationArgs } from './dtos/reservation.args';

const pubSub = new PubSub();

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {}

  @Mutation(() => Reservation)
  async createReservation(@Args('input') input: CreateReservationDtO) {
    const reservationAdded = await this.reservationService.create(input);
    pubSub.publish('reservationAdded', { reservationAdded });
    return reservationAdded;
  }

  @Mutation(() => Boolean)
  async deleteReservation(@Args('id') id: string) {
    return this.reservationService.delete(id);
  }

  @Query(() => [Reservation])
  async reservations(@Args() reservationArgs: ReservationArgs) {
    return this.reservationService.find(reservationArgs);
  }

  @Subscription(() => Reservation)
  reservationAdded() {
    return pubSub.asyncIterator('reservationAdded');
  }

  @Subscription(() => Reservation)
  reservationRemoved() {
    return pubSub.asyncIterator('reservationRemoved');
  }
}
