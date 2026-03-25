import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { CategoryService, CreateCategoryDto, UpdateCategoryDto } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly category: CategoryService) { }

    @Post('/')
    async create(@Body() dto: CreateCategoryDto) {
        return this.category.create(dto)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.category.update(id, dto)
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.category.delete(id)
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
