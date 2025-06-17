import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'node:crypto';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private readonly repository: ArtistsRepository) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.repository.createArtist(createArtistDto);
  }

  async findAll() {
    return this.repository.getAllArtists();
  }

  async findOne(id: UUID) {
    return this.repository.getOneArtist(id);
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    return this.repository.updateArtist(id, updateArtistDto);
  }

  async remove(id: UUID) {
    return this.repository.deleteArtist(id);
  }
}
