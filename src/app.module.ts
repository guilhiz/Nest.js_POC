import { Logger, Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log'
          })
        ]
      }
    }),
    MoviesModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
