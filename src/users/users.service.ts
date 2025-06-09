import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UUID } from 'node:crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return plainToInstance(
      User,
      await this.repository.createUser(createUserDto),
    );
  }

  async findAll() {
    return plainToInstance(User, await this.repository.getAllUsers());
  }

  async findOne(id: UUID) {
    return plainToInstance(User, await this.repository.getOneUser(id));
  }

  async updatePassword(id: UUID, updatePasswordDto: UpdatePasswordDto) {
    return plainToInstance(
      User,
      await this.repository.updatePassword(id, updatePasswordDto),
    );
  }

  async remove(id: UUID) {
    return plainToInstance(User, await this.repository.deleteUser(id));
  }
}
