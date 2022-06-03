import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { CreateUserDtO } from './dtos/create-user';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async create(input: CreateUserDtO): Promise<User> {
    const password = await bcrypt.hash(
      input.password,
      this.configService.passwordSaltRounds,
    );
    return this.userModel.create({ ...input, password });
  }

  async findOne(query: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(query).lean();
  }

  async find(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async delete(id: string): Promise<boolean> {
    await this.userModel.deleteOne({ id });
    return true;
  }
}
