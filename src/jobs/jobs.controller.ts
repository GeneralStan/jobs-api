import { Controller, Get,Post,Put,Delete,Param,Body, HttpException, HttpStatus, UseFilters, UsePipes, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor,Render} from '@nestjs/common';
import {JobsService} from './jobs.service'
import {Job} from './interfaces/job.inteface';
import {JobDto} from './dto/jobs.dto';
import {ValidationPipe} from '../pipes/validation.pipes'
import {ValidationExceptionFilter} from '../filters/validation-exception.filter '
import {BenchmarkInterceptor} from '../interceptors/benchmark.interceptor'
import {HttpExceptionFilter} from '../filters/http-exception.filter'



@Controller('jobs')
@UseInterceptors(CacheInterceptor,BenchmarkInterceptor)
export class JobsController {
    constructor(private readonly jobsService:JobsService){}

    @Get()
    @CacheKey('allJobs')
    @CacheTTL(15)//seconds
    @Render('jobs/index')
    root(){
        return this.jobsService
                    .findAll()
                    .then((result) => result ? {jobs: result} :{jobs:[] } );
    }

    @Get(':id')
    @CacheTTL(30)//seconds
    find(@Param('id')id): Promise<Job> {
        return this.jobsService.find(id)
                .then((result) => {
                    if(result) {
                        return result;
                    }else {
                        throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
                    }
                })
                .catch(() => {
                    throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
                });

    }
    @Post()
    @UseFilters(new ValidationExceptionFilter())
    create(@Body(ValidationPipe) jobDto:JobDto): Promise<Job>{
        return this.jobsService.create(jobDto);
    }

    @Put(':id')
    update( @Param('id')id, @Body()updateJobDto:JobDto):Promise<Job>{
        return this.jobsService.update(id,updateJobDto);
    }

    @Delete(':id')
    delete(@Param('id')id):Promise<Job>{
        return this.jobsService.delete(id);
    }

}
