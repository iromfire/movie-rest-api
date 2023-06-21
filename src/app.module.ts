import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/moviebox?directConnection=true',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
