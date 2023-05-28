import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { JwtPayloadType } from 'src/common/types/jwt-payload.types';
import { Roles } from 'src/decorators/enum.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.User)
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  create(@Body() createMovie: CreateMovieDto, @JwtPayload() payload: JwtPayloadType) {
    return this.movieService.create(createMovie, payload);
  }

  @Get()
  list(): Promise<Movie[]> {
    return this.movieService.list();
  }

  @Get(':id')
  show(@ParamId() id: number): Promise<Movie> {
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
