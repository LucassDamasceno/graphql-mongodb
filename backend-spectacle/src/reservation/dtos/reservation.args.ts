import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class ReservationArgs {
  @Field()
  @IsString()
  @IsOptional()
  spectacleId: string;
}
