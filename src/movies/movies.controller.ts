import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie-dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  create(@Body() createMovie: CreateMovieDto) {
    return this.movieService.create(createMovie);
  }

  @Get()
  list(): Promise<Movie[]> {
    return this.movieService.list();
  }
}
