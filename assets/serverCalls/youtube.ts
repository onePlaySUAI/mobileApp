import SERVER_LINK from "@/assets/serverCalls/SERVER_LINK";
import {Platform} from "react-native";

export interface SongResponse {
  "name": string,
  "type": 0 | 1 | 2 ,
  "stream": string,
  "authorName": string,
  "albumName"?: string,
  "lastFMMbId"?: string,
  "youTubeId"?: string,
  "spotifyId"?: string,
  "imageSet": {
    "small": string | null,
    "medium": string | null,
    "large": string | null,
    "extraLarge": string | null,
    "mega": string | null
  }
}

export async function ytGetSongByQuery (query: string): Promise<SongResponse> {
  const params = new URLSearchParams({ query, isSafari: String(Platform.OS === 'ios') });
  const API_URl = `${SERVER_LINK}/api/YouTube/getSongByQuery?${params}`;
  const res = await fetch(API_URl);

  if (!res.ok) throw res.status.toString();

  const data = await res.json();
  return data as SongResponse;
}

export async function getListOfSongsByQuery(
  query: string,
  size: number
): Promise<SongResponse[]> {
  const params = new URLSearchParams({ query, size: String(size) });
  const API_URL = `${SERVER_LINK}/api/YouTube/getListOfSongsByQuery?${params}`;

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json", // request JSON response
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data as SongResponse[];
}

export async function getSteamByYItId (youtubeId: string): Promise<string> {
  const params = new URLSearchParams({ youtubeId, isSafari: String(Platform.OS === 'ios') });
  const API_URl = `${SERVER_LINK}/api/YouTube/getStreamByYouTubeId?${params}`;
  console.log(API_URl)

  const res = await fetch(API_URl);

  if (!res.ok) throw res.status.toString();

  const data = await res.json() as SongResponse;
  return data.stream;
}