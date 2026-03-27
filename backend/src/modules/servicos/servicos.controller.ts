import { Controller, Post, Body, Param, Put, Delete, Get, UseGuards } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { User } from '../user/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Permissions as PermissionsEnums } from '../common/enums/permissions.enums';
import { zodBody } from '../common/decorators/zod-body.decorator';
import { createServicoSchema, updateServicoSchema } from '../servicos/schemas/create-servicos.schema';
import type { createServicoDto, updateServicoDto } from '../servicos/schemas/create-servicos.schema';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enums';



@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicos: ServicosService) { }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.SELLER, Role.ADMIN)
    @Permissions(PermissionsEnums.SERVICOS.CREATE)
    async create(@zodBody(createServicoSchema) dto: createServicoDto, @User() user: any) {
        return this.servicos.create(
            dto,
            user.id
        )
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.SELLER, Role.ADMIN)
    @Permissions(PermissionsEnums.SERVICOS.UPDATE)
    async(@Param('id') id: string, @zodBody(updateServicoSchema) dto: updateServicoDto) {
        return this.servicos.update(id, dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.SELLER, Role.ADMIN)
    @Permissions(PermissionsEnums.SERVICOS.DELETE)
    async delete(@Param('id') id: string) {
        return this.servicos.delete(id)
    }

    @Get()
    async FindAll() {
        return this.servicos.getAll()
    }
    @Get(':id')
    async FindById(@Param('id') id: string) {
        return this.servicos.getServById(id)
    }
}