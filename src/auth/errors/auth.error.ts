import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAccessToken extends HttpException {
  constructor() {
    super('invalid access token', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRefreshToken extends HttpException {
  constructor() {
    super('invalid refresh token', HttpStatus.UNAUTHORIZED);
  }
}
