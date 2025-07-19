import { Module } from '@nestjs/common';

import { TwitterModule } from './twitter/twitter.module';
import { TwitterService } from './twitter/twitter.service';
import { TwitterController } from './twitter/twitter.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TwitterModule],
  controllers: [TwitterController],
  providers: [TwitterService, PrismaService],
})
export class AppModule {}
