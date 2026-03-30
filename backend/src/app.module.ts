import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentsController } from './modules/comments/comments.controller';
import { CommentsService } from './modules/comments/comments.service';
import { CommentsModule } from './modules/comments/comments.module';
import { FavoriteController } from './modules/favorite/favorite.controller';
import { FavoriteService } from './modules/favorite/favorite.service';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ServicosModule,
    PrismaModule, CategoryModule, CommentsModule, FavoriteModule
  ],
  controllers: [AppController, CommentsController, FavoriteController],
  providers: [AppService, CommentsService, FavoriteService],
})
export class AppModule { }
