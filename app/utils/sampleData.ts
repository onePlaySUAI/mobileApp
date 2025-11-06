import { Playlist } from '@/assets/components/home/PlayList/PlayListItem';
import { SongParams } from '@/assets/components/song';

export const mockSongs1: SongParams[] = [
  {
    title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
    artist: 'THE John',
    albumCover:
      'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
    source: 'Spotify',
  },
];

export const mockSongs2: SongParams[] = [];

export const mockPlaylists: Playlist[] = [
  { id: '1', name: 'My Hits', songs: mockSongs1 },
  { id: '2', name: 'Chill Vibes', songs: mockSongs2 },
];

export const mockSearchSongs: SongParams[] = [
  {
    title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
    artist: 'THE John',
    albumCover:
      'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
    source: 'Spotify',
  },
  {
    title: 'I hate you',
    artist: 'Nikita',
    albumCover:
      'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
    source: 'Youtube',
    active: true,
  },
];
