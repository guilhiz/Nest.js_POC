import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name
        },
        {
          expiresIn: '24h',
          issuer: 'login',
          audience: 'users'
        }
      )
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'users'
      });
    } catch (err) {
      return Promise.reject(new UnauthorizedException('Unauthorized', { cause: err }));
    }
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user || loginDto.password !== user.password) {
      throw new UnauthorizedException('email e/ou senha incorretos');
    }

    return this.createToken(user);
  }

  async register(registerDto: RegisterAuthDto) {
    const user = await this.prisma.user.create({
      data: registerDto
    });

    return this.createToken(user);
  }

  async forgot(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) throw new NotFoundException('email está incorreto');

    //TO DO: Enviar email...

    return true;
  }
}
