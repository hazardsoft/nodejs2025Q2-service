import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  clearArtist,
  createAlbum,
  deleteAlbum,
  getAllAlbums,
  getOneAlbum,
  updateAlbum,
} from './albums.repository';
import { UUID } from 'node:crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumsService {
  constructor(private readonly emitter: EventEmitter2) {}

  create(createAlbumDto: CreateAlbumDto) {
    return createAlbum(createAlbumDto);
  }

  findAll() {
    return getAllAlbums();
  }

  findOne(id: UUID) {
    return getOneAlbum(id);
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    return updateAlbum(id, updateAlbumDto);
  }

  remove(id: UUID) {
    const deletedAlbum = deleteAlbum(id);
    if (deletedAlbum) {
      this.emitter.emit('album.deleted', id);
    }
    return deletedAlbum;
  }

  @OnEvent('artist.deleted')
  onArtistDeleted(id: UUID) {
    clearArtist(id);
  }
}
