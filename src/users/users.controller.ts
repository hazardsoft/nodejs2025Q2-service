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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const foundUser = this.usersService.findOne(id);
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const updatedUser = this.usersService.updatePassword(
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
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    const deletedUser = this.usersService.remove(id);
    if (!deletedUser) throw new NotFoundException();
  }
}
