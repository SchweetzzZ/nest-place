import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ItemType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CreateFavoriteDto } from './schemas/create-service.schema';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enums';
import { User } from '../user/user.decorator';

@Controller('favorite')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    async create(@Body() dto: CreateFavoriteDto, @User() user: any) {
        return this.favoriteService.create(user.id, dto)
    }

    @Delete()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    async delete(@Body() dto: CreateFavoriteDto, @User() user: any) {
        return this.favoriteService.delete(user.id, dto.itemId, dto.itemType)
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    async getAll(@User() user: any) {
        return this.favoriteService.getAll(user.id)
    }

    @Get(':itemId/:itemType')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    async get(@Param('itemId') itemId: string, @Param('itemType') itemType: ItemType, @User() user: any) {
        return this.favoriteService.getByItemId(user.id, itemType, itemId)
    }
}
