import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Spectacle, SpectacleDocument } from './spectacle.schema';

@ValidatorConstraint()
@Injectable()
export class ValidateSpectacleId implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Spectacle.name)
    private spectacleModel: Model<SpectacleDocument>,
  ) {}
  public async validate(id?: string) {
    if (id) {
      const spectacle = await this.spectacleModel.findOne({ id });
      return !!spectacle;
    }
    return true;
  }
}
