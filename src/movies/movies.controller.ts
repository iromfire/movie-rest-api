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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Фильмы')
@Controller('api/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Получение всех фильмов' })
  @ApiResponse({ status: 200, type: [Movie] })
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

  @ApiOperation({ summary: 'Получение фильма по id' })
  @ApiResponse({ status: 200, type: Movie })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getById(id);
  }

  @ApiOperation({ summary: 'Создание фильма' })
  @ApiResponse({ status: 201, type: Movie })
  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Удаление фильма по id' })
  @ApiResponse({ status: 200, type: Movie })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.remove(id);
  }

  @ApiOperation({ summary: 'Обновление фильма по id' })
  @ApiResponse({ status: 200, type: Movie })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }
}
