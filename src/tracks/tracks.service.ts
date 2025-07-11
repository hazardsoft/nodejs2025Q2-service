import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUID } from 'node:crypto';
import { TracksRepository } from './tracks.repository';
import { plainToInstance } from 'class-transformer';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private readonly repository: TracksRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    return plainToInstance(
      Track,
      await this.repository.createTrack(createTrackDto),
    );
  }

  async findAll() {
    return plainToInstance(Track, await this.repository.getAllTracks());
  }

  async findOne(id: UUID) {
    return plainToInstance(Track, await this.repository.getOneTrack(id));
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    return plainToInstance(
      Track,
      await this.repository.updateTrack(id, updateTrackDto),
    );
  }

  async remove(id: UUID) {
    return plainToInstance(Track, await this.repository.deleteTrack(id));
  }
}
