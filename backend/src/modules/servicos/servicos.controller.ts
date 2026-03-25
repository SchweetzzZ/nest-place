import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { CreateServicosDto, UpdateServicosDto } from './servicos.service';
import { ServicosService } from './servicos.service';
import { User } from '../user/user.decorator';

@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicos: ServicosService) { }

    @Post('/')
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