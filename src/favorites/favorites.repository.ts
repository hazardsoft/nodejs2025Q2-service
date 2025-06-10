import { UUID } from 'node:crypto';
import { FavAlreadyExists } from './errors/favorites.errors';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

const favoritesEntityId = 1;

@Injectable()
export class FavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTrackFavs() {
    return this.prisma.favoriteTrack.findMany({
      include: {
        track: true,
      },
    });
  }

  async getAllAlbumFavs() {
    return this.prisma.favoriteAlbum.findMany({
      include: {
        album: true,
      },
    });
  }

  async getAllArtistFavs() {
    return this.prisma.favoriteArtist.findMany({
      include: {
        artist: true,
      },
    });
  }

  async createTrackFav(id: UUID) {
    try {
      const createdTrack = await this.prisma.favorite.update({
        where: { id: favoritesEntityId },
        data: {
          tracks: {
            create: {
              trackId: id,
            },
          },
        },
      });
      return createdTrack.id;
    } catch {
      throw new FavAlreadyExists();
    }
  }

  async createAlbumFav(id: UUID) {
    try {
      const createdAlbum = await this.prisma.favorite.update({
        where: { id: favoritesEntityId },
        data: {
          albums: {
            create: {
              albumId: id,
            },
          },
        },
      });
      return createdAlbum.id;
    } catch {
      throw new FavAlreadyExists();
    }
  }

  async createArtistFav(id: UUID) {
    try {
      const createdArtist = await this.prisma.favorite.update({
        where: { id: favoritesEntityId },
        data: {
          artists: {
            create: {
              artistId: id,
            },
          },
        },
      });
      return createdArtist.id;
    } catch {
      throw new FavAlreadyExists();
    }
  }

  async deleteArtistFav(id: UUID) {
    try {
      const deletedArtist = await this.prisma.favoriteArtist.delete({
        where: {
          artistId_favoriteId: { artistId: id, favoriteId: favoritesEntityId },
        },
      });
      return deletedArtist.artistId;
    } catch {
      return null;
    }
  }

  async deleteAlbumFav(id: UUID) {
    try {
      const deletedAlbum = await this.prisma.favoriteAlbum.delete({
        where: {
          albumId_favoriteId: { albumId: id, favoriteId: favoritesEntityId },
        },
      });
      return deletedAlbum.albumId;
    } catch {
      return null;
    }
  }

  async deleteTrackFav(id: UUID) {
    try {
      const deletedTrack = await this.prisma.favoriteTrack.delete({
        where: {
          trackId_favoriteId: { trackId: id, favoriteId: favoritesEntityId },
        },
      });
      return deletedTrack.trackId;
    } catch {
      return null;
    }
  }
}
