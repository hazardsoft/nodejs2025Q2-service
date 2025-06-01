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
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumsService {
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
    return deleteAlbum(id);
  }

  @OnEvent('artist.deleted')
  onArtistDeleted(id: UUID) {
    clearArtist(id);
  }
}
