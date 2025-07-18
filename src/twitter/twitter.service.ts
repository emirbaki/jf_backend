import { Injectable } from '@nestjs/common';
import { CursoredData, Rettiwt, Tweet } from 'rettiwt-api';
import * as dotenv from 'dotenv';

try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  dotenv.config();
} catch (error) {
  console.error('Error loading .env file:', error);
}

const API_KEY: string = process.env.TWITTER_API_KEY || '';
const rettiwt = new Rettiwt({ apiKey: API_KEY });

@Injectable()
export class TwitterService {
  async GetTweets(keyword: string) {
    const dataList: Tweet[] = [];
    let data1: CursoredData<Tweet> = null!;

    await rettiwt.tweet
      .search({
        fromUsers: ['yagosabuncuoglu'],
        includeWords: [keyword],
      })
      .then((data) => {
        data.list.forEach((x) => dataList.push(x));
        //console.log(data.toJSON());
        data1 = data;
      })
      .catch((err) => {
        console.log(err);
      });
    await rettiwt.tweet
      .search(
        {
          fromUsers: ['yagosabuncuoglu'],
          includeWords: [keyword],
        },
        20,
        data1.next.valueOf(),
      )
      .then((data) => {
        data.list.forEach((x) => dataList.push(x));
        //console.log(data.toJSON());
      })
      .catch((err) => {
        console.log(err);
      });
    const jsonObj: JSON = JSON.parse(JSON.stringify(dataList)) as JSON;
    console.log(jsonObj);
    return jsonObj;
  }
}
