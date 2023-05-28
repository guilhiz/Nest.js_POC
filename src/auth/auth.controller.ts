import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/users')
  async list() {
    return this.authService.list();
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }
}
