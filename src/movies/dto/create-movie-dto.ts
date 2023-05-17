import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(15, 150)
  @IsNotEmpty()
  synopsis: string;
}
