import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { NotValidPassword } from 'src/users/errors/users.errors';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import {
  accessTokenExpirationTime,
  accessTokenSecret,
  refreshTokenExpirationTime,
  refreshTokenSecret,
  saltRounds,
} from './consts';
import { InvalidRefreshToken } from './errors/auth.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
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
    return await this.generateTokens(foundUser.id, loginDto.login);
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload: { userId: string; login: string } =
        await this.jwtService.verifyAsync(refreshDto.refreshToken, {
          secret: refreshTokenSecret,
        });
      return this.generateTokens(payload.userId, payload.login);
    } catch (error) {
      throw new InvalidRefreshToken();
    }
  }

  private async generateTokens(id: string, login: string) {
    const payload = { userId: id, login };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: accessTokenSecret,
        expiresIn: `${accessTokenExpirationTime}s`,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: refreshTokenSecret,
        expiresIn: `${refreshTokenExpirationTime}s`,
      }),
    };
  }
}
