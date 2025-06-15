export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(artist: Artist) {
    Object.assign(this, artist);
  }
}
