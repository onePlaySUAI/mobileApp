import refreshToken from "@/assets/serverCalls/refreshToken";
import SERVER_LINK from "@/assets/serverCalls/SERVER_LINK";

interface songResponse {
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

export async function ytGetSongByQuery (query: string): Promise<songResponse> {
  const params = new URLSearchParams({ query });
  const API_URl = `${SERVER_LINK}/api/YouTube/getSongByQuery?${params}`;

  let res = await fetch(API_URl);

  if (!res.ok) {
    if (res.status === 476) {
      try {
        await refreshToken();
        res = await fetch(API_URl);
      } catch (e) {
        console.error('Failed to refresh the token')
        throw e;
      }
    } else {
      throw res.status.toString();
    }
  }
  const data = await res.json();
  return data as songResponse;
}

// 500 ошибку, не работает нормально
// export async function getListOfSongsByQuery (query: string, size: number): Promise<songResponse[]> {
//
// }