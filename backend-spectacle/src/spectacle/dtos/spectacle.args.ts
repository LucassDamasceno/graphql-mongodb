import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SpectacleArgs {
  @Field()
  @IsString()
  @IsOptional()
  _id: string;
}
