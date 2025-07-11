import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvalidAccessToken } from './errors/auth.error';
import { Request } from 'express';
import { accessTokenSecret } from './consts';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.meta';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // if endpoint is public, skipping it
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new InvalidAccessToken();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: accessTokenSecret,
      });
      console.log(payload);
    } catch (error) {
      throw new InvalidAccessToken();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
