import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { ParamId } from 'src/decorators/param-id.decorator';

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

  @Get(':id')
  show(@Param('id') id: number): Promise<Movie> {
    return this.movieService.show(id);
  }

  @Put(':id')
  update(@ParamId() id: number, @Body() updateMovie: UpdateMovieDto) {
    return this.movieService.update(id, updateMovie);
  }

  @Patch(':id/completed')
  updateCompleted(@ParamId() id: number) {
    return this.movieService.updateCompleted(id);
  }

  @Delete(':id')
  delete(@ParamId() id: number) {
    return this.movieService.delete(id);
  }
}
