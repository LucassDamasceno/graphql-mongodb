import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ReservationModule } from './reservation/reservation.module';
import { SpectacleModule } from './spectacle/spectacle.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://mongo:27017/admin', {
      pass: 'admin',
      user: 'admin',
      dbName: 'spectacle',
    }),
    AuthModule,
    ConfigModule,
    ReservationModule,
    SpectacleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
