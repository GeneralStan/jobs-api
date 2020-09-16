import {IsString, IsInt} from 'class-validator';

export class JobDto{
    @IsString()
    readonly title: string;
    
    @IsInt()
    readonly salary: number;
}