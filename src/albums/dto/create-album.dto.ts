import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
}
