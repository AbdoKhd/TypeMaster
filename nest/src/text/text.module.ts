import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { textProviders } from './text.providers';
import { DatabaseModule } from '../database.module';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TextController],
  providers: [
    TextService,
    ...textProviders,
    UserService,
    ...userProviders,
  ],
})
export class TextModule {}
