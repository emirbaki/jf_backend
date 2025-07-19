import { Injectable } from '@nestjs/common';
import { CursoredData, Rettiwt, Tweet } from 'rettiwt-api';
import * as dotenv from 'dotenv';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

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

  async GetUserDetails(userid: string) {
    const user: CreateUserDto = new CreateUserDto();
    await rettiwt.user
      .details(userid)
      .then((data) => {
        user.username = data?.userName ?? '';
        user.displayName = data?.fullName ?? '';
        user.followerCount = data?.followersCount ?? 0;
        user.createdAt = data?.createdAt ?? '';
        user.description = data?.description ?? '';
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  }
  constructor(private readonly prisma: PrismaService) {}
  async AddUserToDB(userid: string) {
    // This method is a placeholder for adding a user.
    // Implement the logic to add a user to your database or service.
    console.log('User added:', userid);
    const user: CreateUserDto = await this.GetUserDetails(userid);

    if (!user.username) {
      return { message: 'User not found' };
    }

    await this.prisma.source.create({
      data: {
        username: user.username,
        displayName: user.displayName,
        followerCount: user.followerCount,
        createdAt: user.createdAt,
        description: user.description,
      },
    });

    return { message: 'User added successfully', user };
  }
}
