import {
  Controller,
  Post,
  Body,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { NotValidPassword } from 'src/users/errors/users.errors';
import { Public } from './auth.meta';
import { RefreshDto } from './dto/refresh.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const sessionInfo = await this.authService.login(loginDto);
      return sessionInfo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException();
      }
      if (error instanceof NotValidPassword) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshDto) {
    const sessionInfo = await this.authService.refresh(refreshDto);
    return sessionInfo;
  }
}
