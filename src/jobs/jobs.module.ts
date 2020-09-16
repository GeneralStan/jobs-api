import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import {JobSchema} from './schemas/job.schema';
import {AuditMiddleware} from '../middlewares/audit.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name:'Job',schema:JobSchema}]),
    CacheModule.register({
      ttl: 5, //seconds
      max: 100, //maximum number of items in cache
    })],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes({path: 'jobs/*', method: RequestMethod.DELETE});
    
  }

}
