import { UUID } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { NotValidPassword } from './errors/users.errors';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getOneUser(id: UUID) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return foundUser ?? null;
  }

  async getOneUserByLogin(login: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });
    return foundUser ?? null;
  }

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      },
    });
  }

  async updatePassword(id: UUID, dto: UpdatePasswordDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!foundUser) return null;

    if (foundUser.password !== dto.oldPassword) {
      throw new NotValidPassword();
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: dto.newPassword,
        version: {
          increment: 1,
        },
      },
    });
    return updatedUser;
  }

  async deleteUser(id: UUID) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return deletedUser;
    } catch {
      return null;
    }
  }
}
