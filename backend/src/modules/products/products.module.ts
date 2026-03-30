import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServices } from './products.service';
import { S3Module } from '../lib/s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [ProductsController],
  providers: [ProductServices]
})
export class ProductsModule { }
