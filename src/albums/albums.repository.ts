import { UUID } from 'node:crypto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getOneAlbum(id: UUID) {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });
    return foundAlbum ?? null;
  }

  async createAlbum(dto: CreateAlbumDto) {
    return this.prisma.album.create({ data: dto });
  }

  async updateAlbum(id: UUID, dto: UpdateAlbumDto) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: { id },
        data: dto,
      });
      return updatedAlbum;
    } catch (error) {
      return null;
    }
  }

  async deleteAlbum(id: UUID) {
    try {
      const deletedAlbum = await this.prisma.album.delete({ where: { id } });
      return deletedAlbum;
    } catch {
      return null;
    }
  }
}
