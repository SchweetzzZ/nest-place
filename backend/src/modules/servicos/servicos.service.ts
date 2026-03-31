import { Injectable } from "@nestjs/common"
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
        return await this.prisma.$transaction(async (tx) => {
            const verifyCategory = await this.prisma.category.findUnique({
                where: { id: data.categoryId }
            })
            if (!verifyCategory) throw new Error("Category not found")

            if (data.images) {
                const currentImages = await this.prisma.servicos_images.findMany({
                    where: { serviceId: id }
                })
                const newSet = new Set(data.images.map(img => img.imageKey))

                for (const img of currentImages) {
                    if (!newSet.has(img.imageKey)) {
                        await this.s3Service.deleteObject(img.imageKey)
                    }
                }
                await tx.servicos_images.deleteMany({
                    where: {
                        serviceId: id,
                        imageKey: {
                            notIn: data.images.map(img => img.imageKey)
                        }
                    }
                })
                await tx.servicos_images.createMany({
                    data: data.images.map((img, index) => ({
                        serviceId: id,
                        imageUrl: img.imageUrl,
                        imageKey: img.imageKey,
                        position: index,
                    })),
                    skipDuplicates: true
                })

            }
            return this.prisma.servicos.update({
                where: { id },
                data
            })
        })
    }
    async delete(id: string) {
        return await this.prisma.$transaction(async (tx) => {
            const verifyImages = await tx.servicos_images.findMany({
                where: { serviceId: id }
            })
            for (const img of verifyImages) {
                await this.s3Service.deleteObject(img.imageKey)
            }
            const deleteServ = await tx.servicos.delete({
                where: { id }
            })
            return deleteServ
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