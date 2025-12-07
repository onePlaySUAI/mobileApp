import Spotify from 'spotify-web-api-js';
import {SongResponse} from "@/assets/serverCalls/youtube";

const spotify = new Spotify();

export async function getSongsSpotify(query: string, token: string | null, size: number) {
  // eslint-disable-next-line no-unused-expressions
  if (!token) [];

  spotify.setAccessToken(token);
  try {
    const res = await spotify.searchTracks(query, { limit: size });
    const songsArray = []

    for (let song of res.tracks.items) {
      const MAX_ARTIST_NAME = 50;
      const artist = [];
      for (let artistObj of song.artists) {
        artist.push(artistObj.name)
      }

      const artistName =
        artist.join(', ').length > MAX_ARTIST_NAME
          ? artist.join(', ').slice(0, MAX_ARTIST_NAME) + '...'
          : artist.join(', ')


      songsArray.push({
        spotifyId: song.id,
        name: song.name,
        authorName: artistName,
        type: 1,
        imageSet: {
          small: null,
          medium: song.album.images[0].url ?? null,
          large: song.album.images[1].url ?? null,
          extraLarge: null,
          mega: song.album.images[1].url ?? null,
        },
        stream: song.uri,
      } as SongResponse )
    }

    return songsArray;
  } catch {
    return [];
  }
}