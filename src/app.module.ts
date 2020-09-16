import { Module } from '@nestjs/common';
import {JobsModule} from './jobs/jobs.module'
import {MongooseModule} from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [JobsModule,MongooseModule.forRoot(config.mongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
