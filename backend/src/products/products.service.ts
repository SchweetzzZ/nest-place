import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { PartialType } from "@nestjs/mapped-types";

export class CreateProductDto {
    name!: string;
    description!: string;
    categoryId!: string;
    price!: number;
}
export class UpdateProductDto extends PartialType(CreateProductDto) { }


@Injectable()
export class ProductServices {
    constructor(private prisma: PrismaService) { }

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
        return createProd;
    }

    async update(id: string, data: UpdateProductDto) {
        const verifyProd = await this.prisma.products.findUnique({
            where: { id }
        })
        if (!verifyProd) throw new Error("Product not found")

        const updateProd = await this.prisma.products.update({
            where: { id },
            data
        })
        return updateProd;
    }

    async delete(id: string) {
        const deleteProd = await this.prisma.products.delete({
            where: { id }
        })
        return deleteProd;
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