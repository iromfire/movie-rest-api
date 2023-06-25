import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: '500 дней лета', description: 'Название фильма' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Душевный антиромком о двух молодых жителях Лос-Анджелеса',
    description: 'Описание фильма',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 7.6,
    description: 'Рейтинг фильма',
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;

  @ApiProperty()
  readonly photos?: string[];
}
