import { Module } from '@nestjs/common';
import { ServicosController } from './servicos.controller';
import { ServicosService } from './servicos.service';
import { S3Service } from '../lib/s3/s3.service';

@Module({
  imports: [S3Service],
  controllers: [ServicosController],
  providers: [ServicosService]
})
export class ServicosModule { }
