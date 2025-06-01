import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
