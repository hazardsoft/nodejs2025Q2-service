import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'node:crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { NotValidPassword } from './errors/users.errors';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const foundUser = await this.usersService.findOne(id);
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const updatedUser = await this.usersService.updatePassword(
        id,
        updatePasswordDto,
      );
      if (!updatedUser) throw new NotFoundException();
      return updatedUser;
    } catch (error) {
      if (error instanceof NotValidPassword) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) throw new NotFoundException();
  }
}
