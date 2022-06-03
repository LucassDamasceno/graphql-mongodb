import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@ArgsType()
export class UpdateSpectacleDTO {
  @IsString()
  @IsNotEmpty()
  @Field()
  _id: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  @IsOptional()
  description: string;

  @IsNumber()
  @Field()
  @IsOptional()
  reservationPrice: number;

  @IsInt()
  @Field()
  @IsOptional()
  reservationLimit: number;
}
