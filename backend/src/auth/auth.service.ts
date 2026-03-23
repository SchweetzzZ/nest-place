import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isValid = await bcrypt.compare(pass, user.password)

        if (!isValid) {
            throw new UnauthorizedException("Invalid credentials AQUI");
        }

        return user;
    }

    async register(email: string, name: string, pass: string) {
        const hash = await bcrypt.hash(pass, 10)
        return this.prisma.user.create({
            data: {
                email,
                password: hash,
                name,
            }
        })

    }

    async login(user: any) {
        const payload = {
            username: user.email,
            sub: user.id,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}