import SERVER_LINK from "@/assets/serverCalls/SERVER_LINK";
import {Platform} from "react-native";

interface SongResponse {
  "name": string,
  "type": 0,
  "stream": string,
  "authorName": string,
  "albumName": string,
  "lastFMMbId": string,
  "youTubeId": string,
  "imageSet": {
    "small": string,
    "medium": string,
    "large": string,
    "extraLarge": string,
    "mega": string
  }
}

// Массив SongResponse, в каждой песне пустой streamId
type SongListResponse = (Omit<SongResponse, "streamId"> & {
  streamId: ".";
})[];

export async function ytGetSongByQuery (query: string): Promise<SongResponse> {
  const params = new URLSearchParams({ query, isSafari: String(Platform.OS === 'ios') });
  const API_URl = `${SERVER_LINK}/api/YouTube/getSongByQuery?${params}`;

  const res = await fetch(API_URl);

  if (!res.ok) throw res.status.toString();

  const data = await res.json();
  return data as SongResponse;
}

export async function getListOfSongsByQuery (query: string, size: number): Promise<SongListResponse> {
  const params = new URLSearchParams({ query, size: String(size) });

  const API_URL = `${SERVER_LINK}/api/YouTube/getListOfSongsByQuery?${params}`;

  const res = await fetch(API_URL);

  if (!res.ok) throw res.status.toString();

  const data = await res.json();
  return data as SongListResponse;
}

export async function getSteamByYItId (youtubeId: string): Promise<string> {
  const params = new URLSearchParams({ youtubeId, isSafari: String(Platform.OS === 'ios') });
  const API_URl = `${SERVER_LINK}/api/YouTube/getStreamByYouTubeId?${params}`;

  const res = await fetch(API_URl);

  if (!res.ok) throw res.status.toString();

  const data = await res.json() as SongResponse;
  return data.stream;
}