import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateUserDTO {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
