import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service"
import { S3Service } from '../lib/s3/s3.service';
import { CreateSellerDto, UpdateSellerDto } from './schema/seller-schema';

@Injectable()
export class SellerService {
    constructor(private prisma: PrismaService, private s3Service: S3Service) { }

    async create(userId: string, data: CreateSellerDto) {
        return await this.prisma.$transaction(async (tx) => {
            const verifyUser = await tx.user.findUnique({
                where: { id: userId }
            })
            if (!verifyUser) throw new UnauthorizedException("User not found")

            if (verifyUser.role !== "user") throw new Error("only user can be a seller")

            const verifySeller = await tx.sellerRequest.findFirst({
                where: { userId, status: "pending" }
            })
            if (verifySeller) throw new Error("you already have a seller request pending")

            const createSeller = await tx.sellerRequest.create({
                data: {
                    ...data,
                    userId,
                }
            })
            if (data.images && data.images.length > 0) {
                await tx.sellerRequestImages.createMany({
                    data: data.images.map((image, index) => ({
                        sellerRequestId: createSeller.id,
                        imageUrl: image.imageUrl,
                        imageKey: image.imageKey,
                        position: index,
                    })),
                })
            }
            return createSeller
        })
    }
    async delete(id: string) {
        return await this.prisma.$transaction(async (tx) => {
            const images = await tx.sellerRequestImages.findMany({
                where: { sellerRequestId: id }
            })
            for (const doc of images) {
                await this.s3Service.deleteObject(doc.imageKey)
            }
            if (images.length > 0) {
                await tx.sellerRequestImages.deleteMany({
                    where: { sellerRequestId: id }
                })
            }
            const deleteSeller = await tx.sellerRequest.delete({
                where: { id }
            })
            return deleteSeller
        })
    }
    async getByRequestId(id: string) {
        const request = await this.prisma.sellerRequest.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                sellerRequestImages: {
                    orderBy: {
                        position: "asc"
                    }
                },
                handledByUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })

        if (!request) throw new NotFoundException(`Request with ID ${id} not found`)

        return request
    }

    async getAll() {
        return await this.prisma.sellerRequest.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                sellerRequestImages: {
                    orderBy: {
                        position: "asc"
                    }
                },
                handledByUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })
    }
}