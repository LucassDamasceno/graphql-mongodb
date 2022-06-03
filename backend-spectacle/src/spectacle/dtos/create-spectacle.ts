import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateSpectacleDTO {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  reservationPrice: number;

  @IsInt()
  @Field()
  reservationLimit: number;
}
