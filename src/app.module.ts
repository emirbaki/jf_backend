import { Module } from '@nestjs/common';

import { TwitterModule } from './twitter/twitter.module';
import { TwitterService } from './twitter/twitter.service';
import { TwitterController } from './twitter/twitter.controller';

@Module({
  imports: [TwitterModule],
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class AppModule {}
