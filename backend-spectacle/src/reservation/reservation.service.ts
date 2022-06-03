import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Reservation, ReservationDocument } from './reservation.schema';
import { CreateReservationDtO } from './dtos/create-reservation';
import { InjectModel } from '@nestjs/mongoose';
import { SpectacleService } from 'src/spectacle/spectacle.service';
import { ReservationArgs } from './dtos/reservation.args';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private spectacleService: SpectacleService,
  ) {}

  async create(input: CreateReservationDtO): Promise<Reservation> {
    const reservation = await this.reservationModel.create(input);

    const res = await this.reservationModel
      .findOne({
        id: reservation.id,
        populate: Reservation,
      })
      .populate('spectacle');

    return res;
  }

  async findOne(query: FilterQuery<Reservation>): Promise<Reservation> {
    return this.reservationModel.findOne(query).lean();
  }

  async find({
    spectacleId,
    ...args
  }: ReservationArgs): Promise<Reservation[]> {
    return this.reservationModel
      .find({ spectacle: spectacleId, ...args })
      .lean()
      .populate({ path: 'spectacle' });
  }

  async delete(_id: string): Promise<boolean> {
    await this.reservationModel.deleteOne({ _id });
    return true;
  }
}
