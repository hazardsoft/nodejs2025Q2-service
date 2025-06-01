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

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Post('track/:id')
  createTrackFav(@Param('id', new ParseUUIDPipe()) trackId: UUID) {
    if (!this.tracksService.findOne(trackId))
      throw new UnprocessableEntityException();
    this.favoritesService.createTrack(trackId);
    return {
      message: `track ${trackId} is added to favs`,
    };
  }

  @Post('album/:id')
  createAlbumFav(@Param('id', new ParseUUIDPipe()) albumId: UUID) {
    if (!this.albumsService.findOne(albumId))
      throw new UnprocessableEntityException();
    this.favoritesService.createAlbum(albumId);
    return {
      message: `album ${albumId} is added to favs`,
    };
  }

  @Post('artist/:id')
  createArtistFav(@Param('id', new ParseUUIDPipe()) artistId: UUID) {
    if (!this.artistsService.findOne(artistId))
      throw new UnprocessableEntityException();
    this.favoritesService.createArtist(artistId);
    return {
      message: `artist ${artistId} is added to favs`,
    };
  }

  @Get()
  findAll() {
    const artistFavs = this.favoritesService.getAllArtists();
    const albumFavs = this.favoritesService.getAllAlbums();
    const trackFavs = this.favoritesService.getAllTracks();

    const artists = artistFavs.map((artistId) => {
      return this.artistsService.findOne(artistId);
    });
    const albums = albumFavs.map((albumId) => {
      return this.albumsService.findOne(albumId);
    });
    const tracks = trackFavs.map((trackId) => {
      return this.tracksService.findOne(trackId);
    });

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
