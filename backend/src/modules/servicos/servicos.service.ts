import { Injectable } from "@nestjs/common"
import { PartialType } from "@nestjs/mapped-types"
import { PrismaService } from "prisma/prisma.service"
import { S3Service } from "../lib/s3/s3.service"
import { createServicoDto, updateServicoDto } from "./schemas/create-servicos.schema"

@Injectable()
export class ServicosService {
    constructor(private prisma: PrismaService, private s3Service: S3Service) { }

    async create(data: createServicoDto, userId: string) {
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
    async update(id: string, data: updateServicoDto) {
        const verifyCategory = await this.prisma.category.findUnique({
            where: { id: data.categoryId }
        })
        if (!verifyCategory) throw new Error("Category not found")
        if (data.images) {
            const currentImages = await this.prisma.servicos.findMany({
                where: { id }
            })
            for
        }
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