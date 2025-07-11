import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  @Transform(({ value }) => {
    return value instanceof Date ? value.getTime() : value;
  })
  createdAt: number; // timestamp of creation

  @Transform(({ value }) => {
    return value instanceof Date ? value.getTime() : value;
  })
  updatedAt: number; //

  constructor(user: User) {
    Object.assign(this, user);
  }
}
