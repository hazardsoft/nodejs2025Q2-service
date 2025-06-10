import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUID } from 'node:crypto';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavAlreadyExists } from './errors/favorites.errors';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Post('track/:id')
  async createTrackFav(@Param('id', new ParseUUIDPipe()) trackId: UUID) {
    if (!(await this.tracksService.findOne(trackId)))
      throw new UnprocessableEntityException();
    try {
      await this.favoritesService.createTrack(trackId);
      return {
        message: `track ${trackId} is added to favs`,
      };
    } catch (error) {
      if (error instanceof FavAlreadyExists) {
        throw new UnprocessableEntityException();
      }
      throw error;
    }
  }

  @Post('album/:id')
  async createAlbumFav(@Param('id', new ParseUUIDPipe()) albumId: UUID) {
    if (!(await this.albumsService.findOne(albumId)))
      throw new UnprocessableEntityException();
    try {
      await this.favoritesService.createAlbum(albumId);
      return {
        message: `album ${albumId} is added to favs`,
      };
    } catch (error) {
      if (error instanceof FavAlreadyExists) {
        throw new UnprocessableEntityException();
      }
      throw error;
    }
  }

  @Post('artist/:id')
  async createArtistFav(@Param('id', new ParseUUIDPipe()) artistId: UUID) {
    if (!(await this.artistsService.findOne(artistId)))
      throw new UnprocessableEntityException();
    try {
      await this.favoritesService.createArtist(artistId);
      return {
        message: `artist ${artistId} is added to favs`,
      };
    } catch (error) {
      if (error instanceof FavAlreadyExists) {
        throw new UnprocessableEntityException();
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    const artists = (await this.favoritesService.getAllArtists()).map(
      (favArtist) => favArtist.artist,
    );
    const albums = (await this.favoritesService.getAllAlbums()).map(
      (favAlbum) => favAlbum.album,
    );
    const tracks = (await this.favoritesService.getAllTracks()).map(
      (favTrack) => favTrack.track,
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) trackId: UUID) {
    const deletedTrack = this.favoritesService.removeTrack(trackId);
    if (!deletedTrack) throw new NotFoundException();
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) albumId: UUID) {
    const deletedAlbum = this.favoritesService.removeAlbum(albumId);
    if (!deletedAlbum) throw new NotFoundException();
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) artistId: UUID) {
    const deletedArtist = this.favoritesService.removeArtist(artistId);
    if (!deletedArtist) throw new NotFoundException();
  }
}
