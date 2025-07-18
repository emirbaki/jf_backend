import { Injectable } from '@nestjs/common';
import { CursoredData, Rettiwt, Tweet } from 'rettiwt-api';

const API_KEY =
  'a2R0PW5nUEhzam1TSjFKUkRXTVRjNU12cjB6SG9XVm9ESmNKMWZFZlA1V0U7YXV0aF90b2tlbj00MjVlMTE4MDg0NDhlOWFiNDhmM2Q1Y2RmYjZmYThiZTU5Njg3MzQyO2N0MD01ZDI4ZGJmNGEwYzY1YWE5ZTc0MWE2OTI3NjZiMWUxMDdiNDMzZDBmM2FhMmQzNjljYjdkM2I4ZWZlNzBkYTJiMjczYTViYzk0OGNmZDMyZDA5NjFmNTA0NDkxOGU4Zjc2YjkxODAzYzhkMTg5NTYwMjIwNGVmMmNiYTUxNTllYmM2NzgxMWViZjQwZDYxNWQyMWVlYjI0MTNiNWZmM2VjO3R3aWQ9dSUzRDIyMDE3NzM5NDY7';
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
          includeWords: ['osimhen'],
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
