import { CreateUserDtO } from './dtos/create-user';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { User } from './user.schema';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'src/decorators/public';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation(() => User)
  async createUser(@Args() createUserDtO: CreateUserDtO) {
    const userAdded = await this.userService.create(createUserDtO);
    pubSub.publish('userAdded', { userAdded });
    return userAdded;
  }

  @Mutation(() => Boolean)
  async delete(@Args('where') id: string) {
    return this.userService.delete(id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.find();
  }

  @Subscription(() => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }

  @Subscription(() => User)
  userRemoved() {
    return pubSub.asyncIterator('userRemoved');
  }
}
