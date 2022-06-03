import { ReservationService } from './../reservation/reservation.service';
import { Model, FilterQuery } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Spectacle, SpectacleDocument } from './spectacle.schema';
import { CreateSpectacleDTO } from './dtos/create-spectacle';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateSpectacleDTO } from './dtos/update-spectacle';

@Injectable()
export class SpectacleService {
  constructor(
    @InjectModel(Spectacle.name)
    private spectacleModel: Model<SpectacleDocument>,
    @Inject(forwardRef(() => ReservationService))
    private reservationService: ReservationService,
  ) {}

  async create(input: CreateSpectacleDTO): Promise<Spectacle> {
    const createSpectacle = new this.spectacleModel(input);

    await createSpectacle.populate('reservations');

    return createSpectacle.save();
  }

  async findOne(query: FilterQuery<Spectacle>): Promise<Spectacle> {
    return this.spectacleModel.findOne(query).lean();
  }

  async find(): Promise<Spectacle[]> {
    const spectacles = await this.spectacleModel
      .find()
      .lean()
      .populate('reservations');

    const response = Promise.all(
      spectacles.map((item) =>
        (async () => {
          const reservations = await this.reservationService.find({
            spectacleId: item._id,
          });

          return { ...item, reservations };
        })(),
      ),
    );

    return response;
  }

  async update({ _id, ...data }: UpdateSpectacleDTO): Promise<boolean> {
    await this.spectacleModel.updateOne({ _id }, data);
    return true;
  }

  async delete(_id: string): Promise<boolean> {
    await this.spectacleModel.deleteOne({ _id });
    return true;
  }
}
