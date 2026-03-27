import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { CategoryService, CreateCategoryDto, UpdateCategoryDto } from './category.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Role } from '../common/enums/role.enums';
import { Permissions as PermissionEnums } from '../common/enums/permissions.enums';
import { User } from '../user/user.decorator';

@Controller('category')
export class CategoryController {
    constructor(private readonly category: CategoryService) { }

    @Post('/')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.CATEGORY.CREATE)
    async create(@Body() dto: CreateCategoryDto, @User() user: any) {
        return this.category.create(dto, user.id)
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.CATEGORY.UPDATE)
    async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @User() user: any) {
        return this.category.update(id, dto, user.id)
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.CATEGORY.DELETE)
    async delete(@Param('id') id: string, @User() user: any) {
        return this.category.delete(id, user.id)
    }
    @Get()
    async findAll() {
        return this.category.getAll()
    }
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.category.getCategoryById(id)
    }
}
