import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAccessToken extends HttpException {
  constructor() {
    super('invalid access token', HttpStatus.UNAUTHORIZED);
  }
}
