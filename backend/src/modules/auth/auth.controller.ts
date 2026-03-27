import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';

export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto {
  email!: string;
  password!: string;
  name!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response) {

    const user = await this.authService.validateUser(
      dto.email,
      dto.password
    );

    const token = await this.authService.login(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',//strict, lax, none
    })
    return {
      accessToken: token,
    }
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.name, dto.password);
  }
}