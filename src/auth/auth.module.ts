import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

const jwtSecret = String(process.env.JWT_SECRET) ?? '';
const accessTokenExpirationTime =
  Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME) ?? 60;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: `${accessTokenExpirationTime}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
