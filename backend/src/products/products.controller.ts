import { Body, Controller, Post, Put, Delete, Get, Param } from '@nestjs/common';
import { ProductServices } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/auth/user/user.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductServices) { }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    async create(@Body() dto: CreateProductDto,
        @User() user: any) {
        return this.products.create(dto, user.id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.products.update(id, dto);
    }
    @Delete(':id')
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

