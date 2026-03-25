import { Injectable } from "@nestjs/common"
import { PartialType } from "@nestjs/mapped-types"
import { PrismaService } from "prisma/prisma.service"

export class CreateServicosDto {
    name: string
    description: string
    price: number
    userId: string
    categoryId: string
}

export class UpdateServicosDto extends PartialType(CreateServicosDto) { }

@Injectable()
export class ServicosService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateServicosDto, userId: string) {
        const verifyCategory = await this.prisma.category.findUnique({
            where: { id: data.categoryId }
        })
        if (!verifyCategory) throw new Error("Category not found")
        const createServico = await this.prisma.servicos.create({
            data: {
                ...data,
                userId
            }
        })
        return createServico
    }
    async update(id: string, data: UpdateServicosDto) {
        const verifyCategory = await this.prisma.category.findUnique({
            where: { id: data.categoryId }
        })
        if (!verifyCategory) throw new Error("Category not found")
        return this.prisma.servicos.update({
            where: { id },
            data
        })
    }
    async delete(id: string) {
        return this.prisma.servicos.delete({
            where: { id }
        })
    }
    async getAll() {
        return this.prisma.servicos.findMany()
    }
    async getServById(id: string) {
        return this.prisma.servicos.findUnique({
            where: { id }
        })
    }
}