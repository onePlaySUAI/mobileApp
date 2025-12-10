import Spotify from 'spotify-web-api-js';
import {SongResponse} from "@/assets/serverCalls/youtube";
import {getSpotifyRefreshToken} from "@/assets/serverCalls/spotify";
import * as SecureStore from 'expo-secure-store';

const spotify = new Spotify();

export async function getSongsSpotify(query: string, token: string | null, size: number) {
  // return early when no token
  if (!token) return [];

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
          medium: song.album.images[0]?.url ?? null,
          large: song.album.images[1]?.url ?? null,
          extraLarge: null,
          mega: song.album.images[1]?.url ?? null,
        },
        stream: song.uri,
      } as SongResponse )
    }

    return songsArray;
  } catch (e: any) {
    // Check for expired access token error from Spotify API
    if (
      (e?.status === 401) ||
      (e?.response?.status === 401) ||
      (e?.response?.error?.status === 401) ||
      (typeof e?.message === 'string' && e.message.toLowerCase().includes('access token expired')) ||
      (typeof e?.response?.error?.message === 'string' && e.response.error.message.toLowerCase().includes('access token expired'))
    ) {
      const newRefresh = await getSpotifyRefreshToken();
      // persist new token and update spotify client, then retry with new token
      await SecureStore.setItemAsync('spotify', newRefresh);
      spotify.setAccessToken(newRefresh);
      return getSongsSpotify(query, newRefresh, size);
    }
    console.error(e)
    return [];
  }
}