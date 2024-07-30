export type Stem = {
  stemId: string;
  name: string;
};

export interface SongList {
  songs: SongMetadata[];
}

export interface SongMetadata {
  title: string;
  artist: string;
  album: string;
  trackNumber: number;
  year: number;
  genre: string;
  albumArtist: string;
  composer: string;
  lyrist: string;
  publisher?: string;
  uuid: string;
  stems: Stem[];
}
