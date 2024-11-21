import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private readonly database: Db,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
  ) {}

  async getTasks() {
    const tasksCollection = this.database.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    return tasks;
  }
}

