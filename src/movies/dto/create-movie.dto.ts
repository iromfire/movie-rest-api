import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;
}
