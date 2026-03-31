import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaService } from 'prisma/prisma.service';
import { S3Service } from '../lib/s3/s3.service';

@Module({
  controllers: [SellerController],
  providers: [SellerService, PrismaService, S3Service],
})
export class SellerModule {}
