import { Injectable } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';

@ValidatorConstraint()
@Injectable()
export class ValidateUserEmail implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  public async validate(email?: string) {
    if (email) {
      const user = await this.userModel.findOne({ email });
      return !user;
    }
    return true;
  }
}

@ArgsType()
export class CreateUserDtO {
  @Field()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(ValidateUserEmail, {
    message: 'Email já existe',
  })
  @Field()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @Field()
  password: string;
}
