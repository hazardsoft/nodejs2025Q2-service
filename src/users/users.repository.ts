import { UUID, randomUUID } from 'node:crypto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { NotValidPassword } from './errors/users.errors';

const users: User[] = [];

const getAllUsers = (): User[] => {
  return users.slice();
};

const getOneUser = (id: UUID): User | null => {
  const foundUser = users.find((user) => user.id === id);
  return foundUser ?? null;
};

const createUser = (dto: CreateUserDto): User => {
  const timestamp = new Date().getTime();
  const createdUser: User = new User({
    id: randomUUID(),
    ...dto,
    version: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  users.push(createdUser);
  return createdUser;
};

const updatePassword = (id: UUID, dto: UpdatePasswordDto): User | null => {
  const foundUser = getOneUser(id);
  if (!foundUser) return null;

  if (foundUser.password !== dto.oldPassword) {
    throw new NotValidPassword();
  }

  const timestamp = new Date().getTime();
  let currentVersion = foundUser.version++;
  return Object.assign(foundUser, {
    password: dto.newPassword,
    updatedAt: timestamp,
    version: ++currentVersion,
  });
};

const deleteUser = (id: UUID): User | null => {
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    const deletedUsers = users.splice(foundIndex, 1);
    return deletedUsers.pop();
  }
  return null;
};

export { getAllUsers, getOneUser, createUser, updatePassword, deleteUser };
