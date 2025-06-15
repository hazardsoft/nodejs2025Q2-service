import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getOneArtist,
  updateArtist,
} from './artists.repository';
import { UUID } from 'node:crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ArtistsService {
  constructor(private readonly emitter: EventEmitter2) {}

  create(createArtistDto: CreateArtistDto) {
    return createArtist(createArtistDto);
  }

  findAll() {
    return getAllArtists();
  }

  findOne(id: UUID) {
    return getOneArtist(id);
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    return updateArtist(id, updateArtistDto);
  }

  remove(id: UUID) {
    const deletedArtist = deleteArtist(id);
    if (deletedArtist) {
      this.emitter.emit('artist.deleted', id);
    }
    return deletedArtist;
  }
}
