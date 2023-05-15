import { Controller, Get, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Post()
  create(): string {
    return 'salve guys';
  }

  @Get()
  list(): string {
    return 'Ok'
  }
}
