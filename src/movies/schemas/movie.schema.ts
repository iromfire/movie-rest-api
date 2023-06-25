import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @ApiProperty({ example: '500 дней лета', description: 'Название фильма' })
  @Prop()
  title: string;

  @ApiProperty({
    example: 'Душевный антиромком о двух молодых жителях Лос-Анджелеса',
    description: 'Описание фильма',
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: 7.6,
    description: 'Рейтинг фильма',
  })
  @Prop()
  rating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
