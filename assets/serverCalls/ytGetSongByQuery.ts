import refreshToken from "@/assets/serverCalls/refreshToken";

interface songResponse {
  id: number,
  name: string,
  type: 0 | 1 | 2, // 0 - download, 1 - spotify, 2 - yt
  stream: string,
  authorName: string,
  albumName: null | string,
}

export default async function ytGetSongByQuery (query: string): Promise<songResponse> {
  const SERVER_LINK = process.env.EXPO_PUBLIC_SERVER_LINK as string;

  const params = new URLSearchParams({ query });
  const API_URl = `${SERVER_LINK}/api/YouTube/getSongByQuery?${params}`;

  let res = await fetch(API_URl);

  if (!res.ok) {
    if (res.status === 676) {
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