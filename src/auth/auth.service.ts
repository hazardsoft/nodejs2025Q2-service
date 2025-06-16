import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { NotValidPassword } from 'src/users/errors/users.errors';
import { User } from 'src/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from 'src/users/users.repository';

const saltRounds = Number(process.env.SALT_ROUNDS) ?? 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly userRepository: UsersRepository,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { login, password } = signUpDto;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await this.userService.create({
      login,
      password: hashedPassword,
    });
    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.userRepository.getOneUserByLogin(
      loginDto.login,
    );
    if (!foundUser) throw new NotFoundException();
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      foundUser.password,
    );
    if (!isValidPassword) throw new NotValidPassword();
    return plainToInstance(User, foundUser);
  }
}
