import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

  async createToken() {
    // return this.jwtService.sign();
  }

  async validateToken(token: string) {
    // return this.jwtService.verify();
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user || loginDto.password !== user.password) {
      throw new UnauthorizedException('email e/ou senha incorretos');
    }

    return user;
  }

  async register(registerDto: RegisterAuthDto) {
    return await this.prisma.user.create({
      data: registerDto
    });
  }

  async forgot(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) throw new UnauthorizedException('email está incorreto');

    //TO DO: Enviar email...

    return true;
  }
}
