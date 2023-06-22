import { Injectable } from '@nestjs/common';
import { Movie } from './schemas/movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getSortAscByRating(): Promise<Movie[]> {
    return this.movieModel.find().sort({ rating: 1 }).exec();
  }

  async getSortDescByRating(): Promise<Movie[]> {
    return this.movieModel.find().sort({ rating: -1 }).exec();
  }

  async getById(id: string): Promise<Movie> {
    return this.movieModel.findById(id);
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    if (createMovieDto.rating > 10) {
    }
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async remove(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndRemove(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, {
      new: true,
    });
  }
}
