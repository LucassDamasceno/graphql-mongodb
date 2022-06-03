import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Reservation } from '../reservation/reservation.schema';

export type SpectacleDocument = Spectacle & mongoose.Document;

@ObjectType()
@Schema()
export class Spectacle {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop({ default: 27.99 })
  reservationPrice: number;

  @Field()
  @Prop()
  reservationLimit: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  })
  @Field(() => [Reservation])
  reservations: Reservation[];

  @Field()
  @Prop({ default: new Date() })
  createdAt: Date;
}

export const SpectacleSchema = SchemaFactory.createForClass(Spectacle);
