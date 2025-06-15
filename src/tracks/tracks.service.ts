import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  clearAlbum,
  clearArtist,
  createTrack,
  deleteTrack,
  getAllTracks,
  getOneTrack,
  updateTrack,
} from './tracks.repository';
import { UUID } from 'node:crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TracksService {
  constructor(private readonly emitter: EventEmitter2) {}

  create(createTrackDto: CreateTrackDto) {
    return createTrack(createTrackDto);
  }

  findAll() {
    return getAllTracks();
  }

  findOne(id: UUID) {
    return getOneTrack(id);
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    return updateTrack(id, updateTrackDto);
  }

  remove(id: UUID) {
    const deletedTrack = deleteTrack(id);
    if (deletedTrack) {
      this.emitter.emit('track.deleted', id);
    }
    return deletedTrack;
  }

  @OnEvent('artist.deleted')
  onArtistDeleted(id: UUID) {
    clearArtist(id);
  }

  @OnEvent('album.deleted')
  onAlbumDeleted(id: UUID) {
    clearAlbum(id);
  }
}
