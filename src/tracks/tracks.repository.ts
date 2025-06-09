import { UUID } from 'node:crypto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TracksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getOneTrack(id: UUID) {
    const foundTrack = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    return foundTrack ?? null;
  }

  async createTrack(dto: CreateTrackDto) {
    return this.prisma.track.create({
      data: dto,
    });
  }

  async updateTrack(id: UUID, dto: UpdateTrackDto) {
    const foundTrack = await this.getOneTrack(id);
    if (!foundTrack) return null;

    return this.prisma.track.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteTrack(id: UUID) {
    try {
      const deletedTrack = await this.prisma.track.delete({ where: { id } });
      return deletedTrack;
    } catch {
      return null;
    }
  }
}
