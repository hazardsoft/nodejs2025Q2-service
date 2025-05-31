import { UUID, randomUUID } from 'node:crypto';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

const artists: Artist[] = [];

const getAllArtists = (): Artist[] => {
  return artists.slice();
};

const getOneArtist = (id: UUID): Artist | null => {
  const foundArtist = artists.find((user) => user.id === id);
  return foundArtist ?? null;
};

const createArtist = (dto: CreateArtistDto): Artist => {
  const createdUser: Artist = new Artist({
    id: randomUUID(),
    ...dto,
  });
  artists.push(createdUser);
  return createdUser;
};

const updateArtist = (id: UUID, dto: UpdateArtistDto): Artist | null => {
  const foundArtist = getOneArtist(id);
  if (!foundArtist) return null;

  return Object.assign(foundArtist, {
    ...dto,
  });
};

const deleteArtist = (id: UUID): Artist | null => {
  const foundIndex = artists.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    const deletedArtists = artists.splice(foundIndex, 1);
    return deletedArtists.pop();
  }
  return null;
};

export {
  getAllArtists,
  getOneArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
