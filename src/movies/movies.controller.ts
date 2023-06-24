import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller('api/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAll(
    @Query('sort_asc') sortAsc?: boolean,
    @Query('sort_desc') sortDesc?: boolean,
  ): Promise<Movie[]> {
    if (sortAsc) {
      return this.moviesService.getSortAscByRating();
    } else if (sortDesc) {
      return this.moviesService.getSortDescByRating();
    } else {
      return this.moviesService.getAll();
    }
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.remove(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }
}
