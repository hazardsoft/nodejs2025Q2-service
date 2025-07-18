import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID } from 'node:crypto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const foundAlbum = await this.albumsService.findOne(id);
    if (!foundAlbum) throw new NotFoundException();
    return foundAlbum;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumsService.update(id, updateAlbumDto);
    if (!updatedAlbum) throw new NotFoundException();
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const deletedAlbum = await this.albumsService.remove(id);
    if (!deletedAlbum) throw new NotFoundException();
    return deletedAlbum;
  }
}
