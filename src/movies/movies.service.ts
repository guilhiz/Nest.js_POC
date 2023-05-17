import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMovie: CreateMovieDto) {
    return await this.prisma.movie.create({
      data: createMovie,
    });
  }

  async list() {
    return await this.prisma.movie.findMany();
  }

  async update(id: number, updateMovie: UpdateMovieDto) {
    return await this.prisma.movie.update({
      where: {
        id,
      },
      data: updateMovie,
    });
  }

  async delete(id: number) {
    return await this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }

  async updateCompleted(id: number) {
    return await this.prisma.movie.update({
      where: {
        id,
      },
      data: {
        completed: true,
      },
    });
  }
}
