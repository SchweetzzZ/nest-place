import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './modules/category/category.service';
import { CategoryController } from './modules/category/category.controller';
import { CategoryModule } from './modules/category/category.module';
import { CommentsController } from './modules/comments/comments.controller';
import { CommentsService } from './modules/comments/comments.service';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ServicosModule,
    PrismaModule, CategoryModule, CommentsModule
  ],
  controllers: [AppController, CategoryController, CommentsController],
  providers: [AppService, CategoryService, CommentsService],
})
export class AppModule { }
