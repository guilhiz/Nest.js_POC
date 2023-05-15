import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesService } from './movies.service';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [],
})
export class MoviesModule {}
