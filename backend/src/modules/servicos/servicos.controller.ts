import { Controller, Post, Body, Param, Put, Delete, Get, UseGuards } from '@nestjs/common';
import { CreateServicosDto, UpdateServicosDto } from './servicos.service';
import { ServicosService } from './servicos.service';
import { User } from '../user/user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enums';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions as PermissionEnums } from '../common/enums/permissions.enums';
import { Permissions } from '../common/decorators/permissions.decorator';


@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicos: ServicosService) { }

    @Post('/')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @Roles(Role.ADMIN)
    @Permissions(PermissionEnums.SERVICOS.CREATE)
    async create(@Body() dto: CreateServicosDto, @User() user: any) {
        return this.servicos.create(
            dto,
            user.id
        )
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateServicosDto) {
        return this.servicos.update(id, dto)
    }

    @Delete(':id')
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