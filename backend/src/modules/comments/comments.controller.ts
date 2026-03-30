import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService, CreateCommentDto } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly comments: CommentsService) { }
    @Post('/')
    @UseGuards(JwtAuthGuard)
    async create(@Body() dto: CreateCommentDto, @User() user: any) {
        return this.comments.create(dto, user.id)
    }
}