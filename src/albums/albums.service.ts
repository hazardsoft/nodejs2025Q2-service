import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID } from 'node:crypto';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
  constructor(private readonly repository: AlbumsRepository) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.repository.createAlbum(createAlbumDto);
  }

  async findAll() {
    return this.repository.getAllAlbums();
  }

  async findOne(id: UUID) {
    return this.repository.getOneAlbum(id);
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    return this.repository.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: UUID) {
    return this.repository.deleteAlbum(id);
  }
}
