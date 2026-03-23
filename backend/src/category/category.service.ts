import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
    name: string
    description: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCategoryDto) {
        return this.prisma.category.create({
            data
        })
    }
    async update(id: string, data: UpdateCategoryDto) {
        return this.prisma.category.update({
            where: { id },
            data
        })
    }
    async delete(id: string) {
        return this.prisma.category.delete({
            where: { id }
        })
    }
    async getAll() {
        return this.prisma.category.findMany()
    }
    async getCategoryById(id: string) {
        return this.prisma.category.findUnique({
            where: { id }
        })
    }
}