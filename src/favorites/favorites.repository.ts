import { UUID } from 'node:crypto';
import { FavAlreadyExists } from './errors/favorites.errors';

const tracks: UUID[] = [];
const albums: UUID[] = [];
const artists: UUID[] = [];

const getAllTrackFavs = (): UUID[] => {
  return tracks.slice();
};

const getAllAlbumFavs = (): UUID[] => {
  return albums.slice();
};

const getAllArtistFavs = (): UUID[] => {
  return artists.slice();
};

const createTrackFav = (id: UUID) => {
  if (tracks.includes(id)) throw new FavAlreadyExists();
  tracks.push(id);
};

const createAlbumFav = (id: UUID) => {
  if (albums.includes(id)) throw new FavAlreadyExists();
  albums.push(id);
};

const createArtistFav = (id: UUID) => {
  if (artists.includes(id)) throw new FavAlreadyExists();
  artists.push(id);
};

const deleteArtistFav = (id: UUID): UUID | null => {
  const foundIndex = artists.findIndex((artistId) => artistId === id);
  if (foundIndex !== -1) {
    artists.splice(foundIndex, 1);
    return id;
  }
  return null;
};

const deleteAlbumFav = (id: UUID): UUID | null => {
  const foundIndex = albums.findIndex((albumId) => albumId === id);
  if (foundIndex !== -1) {
    albums.splice(foundIndex, 1);
    return id;
  }
  return null;
};

const deleteTrackFav = (id: UUID): UUID | null => {
  const foundIndex = tracks.findIndex((tracksId) => tracksId === id);
  if (foundIndex !== -1) {
    tracks.splice(foundIndex, 1);
    return id;
  }
  return null;
};

export {
  createTrackFav,
  createAlbumFav,
  createArtistFav,
  deleteArtistFav,
  deleteAlbumFav,
  deleteTrackFav,
  getAllTrackFavs,
  getAllAlbumFavs,
  getAllArtistFavs,
};
