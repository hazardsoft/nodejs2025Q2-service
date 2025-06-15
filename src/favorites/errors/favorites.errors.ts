export class FavAlreadyExists extends Error {
  constructor() {
    super('fav already exists');
  }
}
