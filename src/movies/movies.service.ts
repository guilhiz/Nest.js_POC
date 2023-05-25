import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayloadType } from 'src/common/types/jwt-payload.types';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) {}

  async create(createMovie: CreateMovieDto, payload: JwtPayloadType) {
    return await this.prisma.movie.create({
      data: {
        title: createMovie.title,
        synopsis: createMovie.synopsis,
        userId: payload.id
      }
    });
  }

  async list() {
    return await this.prisma.movie.findMany();
  }

  async show(id: number) {
    return await this.prisma.movie.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateMovie: UpdateMovieDto) {
    await this.exist(id);

    return await this.prisma.movie.update({
      where: {
        id
      },
      data: updateMovie
    });
  }

  async updateCompleted(id: number) {
    await this.exist(id);

    return await this.prisma.movie.update({
      where: {
        id
      },
      data: {
        completed: true
      }
    });
  }

  async delete(id: number) {
    await this.exist(id);

    await this.prisma.movie.delete({
      where: {
        id
      }
    });
  }

  async exist(id: number) {
    const countUser = await this.prisma.movie.count();
    if (!countUser) throw new NotFoundException('usuário não existe!');
  }
}
