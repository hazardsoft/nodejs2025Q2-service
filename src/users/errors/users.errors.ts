export class NotValidPassword extends Error {
  constructor() {
    super('not valid password');
  }
}
