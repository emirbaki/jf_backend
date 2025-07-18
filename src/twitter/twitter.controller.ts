import { Controller, Get, Param } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}
  @Get(':keyword')
  getTweets(@Param('keyword') keyword: string) {
    return this.twitterService.GetTweets(keyword);
  }
}
