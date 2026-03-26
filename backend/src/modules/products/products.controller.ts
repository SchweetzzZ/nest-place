import { Body, Controller, Post, Put, Delete, Get, Param } from '@nestjs/common';
import { ProductServices } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/modules/user/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Role } from '../common/enums/role.enums';
import { Permissions as PermissionEnums } from '../common/enums/permissions.enums';

@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductServices) { }

    @Post('/')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.PRODUCT.CREATE)
    async create(@Body() dto: CreateProductDto,
        @User() user: any) {
        return this.products.create(dto, user.id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.PRODUCT.UPDATE)
    async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.products.update(id, dto);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.PRODUCT.DELETE)
    async delete(@Param('id') id: string) {
        return this.products.delete(id)
    }
    @Get()
    async findAll() {
        return this.products.getAll();
    }
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.products.getProdById(id);
    }

}

