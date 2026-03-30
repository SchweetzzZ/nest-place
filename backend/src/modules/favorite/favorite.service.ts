import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type { CreateFavoriteDto, UpdateFavoriteDto } from './schemas/create-service.schema';
import { ItemType } from '@prisma/client';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) { }

    async create(userId, data: CreateFavoriteDto) {
        const verifyFavorite = await this.prisma.favorite.findFirst({
            where: {
                userId: userId,
                itemId: data.itemId,
                itemType: data.itemType
            }
        })
        if (verifyFavorite) {
            throw new BadRequestException("Favorite already exists")
        }
        const createFavorite = await this.prisma.favorite.create({
            data: {
                userId: userId,
                itemId: data.itemId,
                itemType: data.itemType
            }
        })
        return createFavorite
    }

    async delete(userId: string, itemId: string, itemType: ItemType) {
        const deleteFavorite = await this.prisma.favorite.delete({
            where: {
                favorite_unique: {
                    userId: userId,
                    itemId: itemId,
                    itemType: itemType
                }
            }
        })
        return deleteFavorite
    }

}
