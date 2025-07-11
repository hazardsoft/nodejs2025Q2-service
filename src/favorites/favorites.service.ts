import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly repository: FavoritesRepository) {}

  async createTrack(id: UUID) {
    return this.repository.createTrackFav(id);
  }

  async createAlbum(id: UUID) {
    return this.repository.createAlbumFav(id);
  }

  async createArtist(id: UUID) {
    return this.repository.createArtistFav(id);
  }

  async removeTrack(id: UUID) {
    return this.repository.deleteTrackFav(id);
  }

  async removeAlbum(id: UUID) {
    return this.repository.deleteAlbumFav(id);
  }

  async removeArtist(id: UUID) {
    return this.repository.deleteArtistFav(id);
  }

  async getAllTracks() {
    return this.repository.getAllTrackFavs();
  }

  async getAllAlbums() {
    return this.repository.getAllAlbumFavs();
  }

  async getAllArtists() {
    return this.repository.getAllArtistFavs();
  }
}
