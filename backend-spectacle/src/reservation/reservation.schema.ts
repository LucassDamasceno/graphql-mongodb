import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Spectacle } from 'src/spectacle/spectacle.schema';

export type ReservationDocument = Reservation & mongoose.Document;

@Schema()
@ObjectType()
export class Reservation {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  personName: string;

  @Field()
  @Prop()
  personCPF: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Spectacle.name })
  @Field(() => Spectacle)
  spectacle: Spectacle;

  @Field()
  @Prop({ default: new Date() })
  createdAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
