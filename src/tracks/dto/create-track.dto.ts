import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
