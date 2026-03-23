import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServices } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductServices]
})
export class ProductsModule { }
