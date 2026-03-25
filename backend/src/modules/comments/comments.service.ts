import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCommentDto {
    comment!: string;
    productId!: string;
    serviceId!: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) { }

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCommentDto, userId: string) {
        if (data.productId && data.serviceId) {
            throw new Error("Não pode enviar comentario a um produto e um serviço ao mesmo tempo")
        }
        if (!data.productId && !data.serviceId) {
            throw new Error("Deve enviar um produto ou um serviço")
        }
        if (data.productId) {
            const verifyProd = await this.prisma.products.findUnique({
                where: { id: data.productId }
            })
            if (!verifyProd) throw new Error("Produto não encontrado")
        }
        if (data.serviceId) {
            const verifyServ = await this.prisma.servicos.findUnique({
                where: { id: data.serviceId }
            })
            if (!verifyServ) throw new Error("Serviço não encontrado")
        }
        const comment = await this.prisma.comments.create({
            data: {
                ...data,
                userId
            }
        })
        if (!comment) {
            throw new Error("Erro ao criar comentario")
        }
        return comment;
    }

    async delete(id: string, userId: string) {
        const verifyComment = await this.prisma.comments.findUnique({
            where: { id }
        })
        if (!verifyComment) {
            throw new Error("comentario nao encontrado")
        }
        const deleteComment = await this.prisma.comments.delete({
            where: { id }
        })
        if (!deleteComment) {
            throw new Error("Erro ao deletar comentario")
        }
        return deleteComment;
    }
    async getAll() {
        return this.prisma.comments.findMany()
    }
    async getCommentById(id: string, userId: string) {
        const verifyComment = await this.prisma.comments.findUnique({
            where: { id }
        })
        if (!verifyComment) {
            throw new Error("comentario nao encontrado")
        }
        return verifyComment;

    }
}

