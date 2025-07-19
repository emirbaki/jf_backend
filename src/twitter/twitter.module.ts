import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TwitterController],
  providers: [TwitterService, PrismaService],
})
export class TwitterModule {}
