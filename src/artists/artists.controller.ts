import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'node:crypto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const foundArtist = this.artistsService.findOne(id);
    if (!foundArtist) throw new NotFoundException();
    return foundArtist;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = this.artistsService.update(id, updateArtistDto);
    if (!updatedArtist) throw new NotFoundException();
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const deletedArtist = this.artistsService.remove(id);
    if (!deletedArtist) throw new NotFoundException();
  }
}
