import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMovie: UpdateMovieDto) {
    return this.movieService.update(Number(id), updateMovie);
  }

  @Patch(':id/completed')
  updateCompleted(@Param('id') id: number) {
    return this.movieService.updateCompleted(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.movieService.delete(Number(id));
  }
}
