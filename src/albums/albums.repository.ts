import { UUID, randomUUID } from 'node:crypto';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

const albums: Album[] = [];

const getAllAlbums = (): Album[] => {
  return albums.slice();
};

const getOneAlbum = (id: UUID): Album | null => {
  const foundAlbum = albums.find((album) => album.id === id);
  return foundAlbum ?? null;
};

const createAlbum = (dto: CreateAlbumDto): Album => {
  const createdAlbum: Album = new Album({
    id: randomUUID(),
    ...dto,
  });
  albums.push(createdAlbum);
  return createdAlbum;
};

const updateAlbum = (id: UUID, dto: UpdateAlbumDto): Album | null => {
  const foundAlbum = getOneAlbum(id);
  if (!foundAlbum) return null;

  return Object.assign(foundAlbum, { ...dto });
};

const deleteAlbum = (id: UUID): Album | null => {
  const foundIndex = albums.findIndex((track) => track.id === id);
  if (foundIndex !== -1) {
    const deletedAlbums = albums.splice(foundIndex, 1);
    return deletedAlbums.pop();
  }
  return null;
};

const clearArtist = (id: UUID): void => {
  albums.forEach((album) => {
    if (album.artistId === id) album.artistId = null;
  });
};

export {
  getAllAlbums,
  getOneAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  clearArtist,
};
