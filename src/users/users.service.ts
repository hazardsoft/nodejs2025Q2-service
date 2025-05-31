import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updatePassword,
} from './users.repository';
import { UUID } from 'node:crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return createUser(createUserDto);
  }

  findAll() {
    return getAllUsers();
  }

  findOne(id: UUID) {
    return getOneUser(id);
  }

  updatePassword(id: UUID, updatePasswordDto: UpdatePasswordDto) {
    return updatePassword(id, updatePasswordDto);
  }

  remove(id: UUID) {
    return deleteUser(id);
  }
}
