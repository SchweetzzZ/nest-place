import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('seller')
@UseGuards(JwtAuthGuard)
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @Get()
    async findAll() {
        return await this.sellerService.getAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.sellerService.getByRequestId(id)
    }
}
