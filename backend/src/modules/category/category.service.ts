import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PartialType } from '@nestjs/mapped-types';
import { RedisService } from '../lib/redis/redis.service';
import { Category } from '@prisma/client';

export class CreateCategoryDto {
    name: string
    description: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService, private redisService: RedisService) { }


    async create(data: CreateCategoryDto, userId: string) {
        await this.redisService.del('categories:all')

        return this.prisma.category.create({
            data: {
                ...data,
                userId
            }
        })
    }
    async update(id: string, data: UpdateCategoryDto, userId: string) {
        await this.redisService.del('categories:all')
        await this.redisService.del(`categories:id:${id}`)

        return this.prisma.category.update({
            where: { id, userId },
            data: {
                ...data
            }
        })
    }
    async delete(id: string, userId: string) {
        await this.redisService.del('categories:all')
        await this.redisService.del(`categories:id:${id}`)

        return this.prisma.category.delete({
            where: { id, userId }
        })
    }
    async getAll() {
        const cachedCategories = await this.redisService.get<Category[]>('categories:all')
        if (cachedCategories) return cachedCategories

        const categories = await this.prisma.category.findMany()
        if (categories) {
            await this.redisService.set('categories:all', categories, 60 * 60 * 24)
        }
        return categories
    }
    async getCategoryById(id: string) {
        const cachedCategory = await this.redisService.get<Category>(`categories:id:${id}`)
        if (cachedCategory) return cachedCategory

        const category = await this.prisma.category.findUnique({
            where: { id }
        })
        if (category) {
            await this.redisService.set(`categories:id:${id}`, category, 60 * 60 * 24)
        }
        return category
    }
}