import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { RedisModule } from '../lib/redis/redis.module';

@Module({
    imports: [RedisModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule { }
