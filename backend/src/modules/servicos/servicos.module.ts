import { Module } from '@nestjs/common';
import { ServicosController } from './servicos.controller';
import { ServicosService } from './servicos.service';
import { S3Module } from '../lib/s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [ServicosController],
  providers: [ServicosService]
})
export class ServicosModule { }
