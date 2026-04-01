import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type { CreateFavoriteDto, UpdateFavoriteDto } from './schemas/create-service.schema';
import { ItemType } from '@prisma/client';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: CreateFavoriteDto) {
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

    async getAll(userId: string) {
        const userFavorites = await this.prisma.favorite.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
        })

        // separar ids
        const productIds = userFavorites
            .filter(f => f.itemType === "product")
            .map(f => f.itemId);

        const serviceIds = userFavorites
            .filter(f => f.itemType === "service")
            .map(f => f.itemId);

        // buscar tudo de uma vez
        const products = productIds.length ? await this.prisma.products.findMany({
            where: { id: { in: productIds } },
            include: {
                products_images: {
                    orderBy: { position: "asc" },
                    take: 1
                }
            }
        }) : [];

        const services = serviceIds.length ? await this.prisma.servicos.findMany({
            where: { id: { in: serviceIds } },
            include: {
                servicos_images: {
                    orderBy: { position: "asc" },
                    take: 1
                }
            }
        }) : [];

        // mapear favoritos
        const productMap = new Map(products.map(p => [p.id, p]));
        const serviceMap = new Map(services.map(s => [s.id, s]));

        const favoriteProducts: any[] = [];
        const favoriteServices: any[] = [];

        for (const fav of userFavorites) {
            if (fav.itemType === "product") {
                const product = productMap.get(fav.itemId);
                if (product) {
                    favoriteProducts.push({
                        ...product,
                        favoriteId: fav.id,
                    });
                }
            } else {
                const service = serviceMap.get(fav.itemId);
                if (service) {
                    favoriteServices.push({
                        ...service,
                        favoriteId: fav.id,
                    });
                }
            }
        }
        return { favoriteProducts, favoriteServices }
    }

    async getByItemId(userId: string, itemType: ItemType, itemId: string) {
        const favorite = await this.prisma.favorite.findUnique({
            where: {
                favorite_unique: {
                    userId: userId,
                    itemType: itemType,
                    itemId: itemId
                }
            }
        })
        return {
            isFavorite: !!favorite,
            favoriteId: favorite?.id ?? null
        }
    }
}
