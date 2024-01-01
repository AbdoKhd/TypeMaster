import { Module } from '@nestjs/common';
import { LatestController } from './latest.controller';
import { LatestService } from './latest.service';
import { latestProviders } from './latest.providers';
import { DatabaseModule } from '../database.module';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LatestController],
  providers: [
    LatestService,
    ...latestProviders,
    UserService,
    ...userProviders,
  ],
})
export class LatestModule {}
