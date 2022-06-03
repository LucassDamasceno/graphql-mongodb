import { CreateSpectacleDTO } from './dtos/create-spectacle';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { SpectacleService } from './spectacle.service';
import { Spectacle } from './spectacle.schema';
import { PubSub } from 'graphql-subscriptions';
import { SpectacleArgs } from './dtos/spectacle.args';
import { UpdateSpectacleDTO } from './dtos/update-spectacle';

const pubSub = new PubSub();
@Resolver(() => Spectacle)
export class SpectacleResolver {
  constructor(private spectacleService: SpectacleService) {}

  @Mutation(() => Spectacle)
  async createSpectacle(@Args('input') input: CreateSpectacleDTO) {
    const spectacleAdded = await this.spectacleService.create(input);
    pubSub.publish('spectacleAdded', { spectacleAdded });
    return spectacleAdded;
  }

  @Mutation(() => Boolean)
  async deleteSpectacle(@Args('id') id: string) {
    return this.spectacleService.delete(id);
  }

  @Mutation(() => Boolean)
  async updateSpectacle(@Args() updateSpectacleDTO: UpdateSpectacleDTO) {
    return this.spectacleService.update(updateSpectacleDTO);
  }

  @Query(() => [Spectacle])
  async spectacles() {
    const res = await this.spectacleService.find();
    return res;
  }

  @Query(() => Spectacle)
  async spectacle(@Args() spectacleArgs: SpectacleArgs) {
    const res = await this.spectacleService.findOne(spectacleArgs);
    return res;
  }

  @Subscription(() => Spectacle)
  spectacleAdded() {
    return pubSub.asyncIterator('spectacleAdded');
  }

  @Subscription(() => Spectacle)
  spectacleRemoved() {
    return pubSub.asyncIterator('spectacleRemoved');
  }
}
