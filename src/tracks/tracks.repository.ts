import { UUID, randomUUID } from 'node:crypto';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

const tracks: Track[] = [];

const getAllTracks = (): Track[] => {
  return tracks.slice();
};

const getOneTrack = (id: UUID): Track | null => {
  const foundTrack = tracks.find((track) => track.id === id);
  return foundTrack ?? null;
};

const createTrack = (dto: CreateTrackDto): Track => {
  const createdTrack: Track = new Track({
    id: randomUUID(),
    ...dto,
  });
  tracks.push(createdTrack);
  return createdTrack;
};

const updateTrack = (id: UUID, dto: UpdateTrackDto): Track | null => {
  const foundTrack = getOneTrack(id);
  if (!foundTrack) return null;

  return Object.assign(foundTrack, { ...dto });
};

const deleteTrack = (id: UUID): Track | null => {
  const foundIndex = tracks.findIndex((track) => track.id === id);
  if (foundIndex !== -1) {
    const deletedTracks = tracks.splice(foundIndex, 1);
    return deletedTracks.pop();
  }
  return null;
};

const clearArtist = (id: UUID): void => {
  tracks.forEach((track) => {
    if (track.artistId === id) track.artistId = null;
  });
};

const clearAlbum = (id: UUID): void => {
  tracks.forEach((track) => {
    if (track.albumId === id) track.albumId = null;
  });
};

export {
  getAllTracks,
  getOneTrack,
  createTrack,
  updateTrack,
  deleteTrack,
  clearArtist,
  clearAlbum,
};
