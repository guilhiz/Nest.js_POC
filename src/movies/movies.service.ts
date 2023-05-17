import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie-dto';

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
}
