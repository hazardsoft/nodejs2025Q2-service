import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UUID } from 'node:crypto';
import {
  createAlbumFav,
  createArtistFav,
  createTrackFav,
  deleteAlbumFav,
  deleteArtistFav,
  deleteTrackFav,
  getAllAlbumFavs,
  getAllArtistFavs,
  getAllTrackFavs,
} from './favorites.repository';

@Injectable()
export class FavoritesService {
  createTrack(id: UUID) {
    return createTrackFav(id);
  }

  createAlbum(id: UUID) {
    return createAlbumFav(id);
  }

  createArtist(id: UUID) {
    return createArtistFav(id);
  }

  removeTrack(id: UUID) {
    return deleteTrackFav(id);
  }

  removeAlbum(id: UUID) {
    return deleteAlbumFav(id);
  }

  removeArtist(id: UUID) {
    return deleteArtistFav(id);
  }

  getAllTracks(): UUID[] {
    return getAllTrackFavs();
  }

  getAllAlbums(): UUID[] {
    return getAllAlbumFavs();
  }

  getAllArtists(): UUID[] {
    return getAllArtistFavs();
  }

  @OnEvent('artist.deleted')
  onArtistDeleted(id: UUID) {
    this.removeArtist(id);
  }

  @OnEvent('album.deleted')
  onAlbumDeleted(id: UUID) {
    this.removeAlbum(id);
  }

  @OnEvent('track.deleted')
  onTrackDeleted(id: UUID) {
    this.removeTrack(id);
  }
}
