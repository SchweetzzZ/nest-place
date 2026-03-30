import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import type { CreateProductDto, UpdateProductDto } from "./schemas/create-product.schema";
import { S3Service } from "../lib/s3/s3.service";

@Injectable()
export class ProductServices {
    constructor(private prisma: PrismaService, private s3Service: S3Service) { }

    async create(data: CreateProductDto, userId: string) {
        const category = await this.prisma.category.findUnique({
            where: { id: data.categoryId }
        })
        if (!category) throw new Error("Category not found")

        const createProd = await this.prisma.products.create({
            data: {
                ...data,
                userId
            }
        })
        if (data.images) {
            data.images.map(async (image, index) => {
                await this.prisma.products_images.create({
                    data: {
                        productId: createProd.id,
                        imageUrl: image.imageUrl,
                        imageKey: image.imageKey,
                        position: index
                    }
                })
            })
        }

        return createProd;
    }

    async update(id: string, data: UpdateProductDto) {
        return await this.prisma.$transaction(async (tx) => {
            const verifyProd = await tx.products.findUnique({
                where: { id }
            })
            if (!verifyProd) throw new Error("Product not found")

            const updateProd = await tx.products.update({
                where: { id },
                data
            })
            if (data.images) {
                const currentImages = await tx.products_images.findMany({
                    where: { productId: id }
                })
                const newKeys = new Set(data.images.map(img => img.imageKey))

                for (const img of currentImages) {
                    if (!newKeys.has(img.imageKey)) {
                        await this.s3Service.deleteObject(img.imageKey)
                    }
                }
                await tx.products_images.deleteMany({
                    where: {
                        productId: id,
                        imageKey: {
                            notIn: data.images.map(img => img.imageKey)
                        }
                    }
                })
                await tx.products_images.createMany({
                    data: data.images.map((img, index) => ({
                        productId: id,
                        imageUrl: img.imageUrl,
                        imageKey: img.imageKey,
                        position: index
                    }))
                })
            }
            return updateProd;
        })
    }

    async delete(id: string) {
        return await this.prisma.$transaction(async (tx) => {
            const veirfyImages = await tx.products_images.findMany({
                where: { productId: id }
            })
            for (const img of veirfyImages) {
                await this.s3Service.deleteObject(img.imageKey)
            }
            const deleteProd = await tx.products.delete({
                where: { id }
            })
            if (!deleteProd) throw new Error("Error deleting product")
            return deleteProd;
        })
    }

    async getAll() {
        return this.prisma.products.findMany();
    }
    async getProdById(id: string) {
        return this.prisma.products.findUnique({
            where: { id }
        })
    }
}