import { UUID } from 'node:crypto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getOneArtist(id: UUID) {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });
    return foundArtist ?? null;
  }

  async createArtist(dto: CreateArtistDto) {
    return this.prisma.artist.create({ data: dto });
  }

  async updateArtist(id: UUID, dto: UpdateArtistDto) {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: { id },
        data: dto,
      });
      return updatedArtist;
    } catch {
      return null;
    }
  }

  async deleteArtist(id: UUID) {
    try {
      const deletedArtist = await this.prisma.artist.delete({ where: { id } });
      return deletedArtist;
    } catch {
      return null;
    }
  }
}
