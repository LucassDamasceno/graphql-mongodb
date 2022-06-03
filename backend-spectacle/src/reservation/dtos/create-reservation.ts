import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ValidateSpectacleId } from 'src/spectacle/spectacle.validator';

@InputType()
export class CreateReservationDtO {
  @IsString()
  @IsNotEmpty()
  @Field()
  personName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  personCPF: string;

  @IsString()
  @Validate(ValidateSpectacleId, {
    message: 'entered spectacle does not correspond to any Spectacle',
  })
  @Field()
  spectacle: string;
}
