import SERVER_LINK from "@/assets/serverCalls/SERVER_LINK";
import * as Linking from 'expo-linking';

interface spotifyAuthUrlResponse {
  url: string;
  sessionId: string;
}

export const spotifyAuthUrl = async () => {
  const redirectUrl = Linking.createURL('(screens)/awaitSpotifyResponse');
  const encodedRedirectUrl = encodeURIComponent(redirectUrl);

  console.log(redirectUrl)
  console.log(`${SERVER_LINK}/api/Spotify/authorize-url/${encodedRedirectUrl}`)

  const res = await fetch(`${SERVER_LINK}/api/Spotify/authorize-url/${encodedRedirectUrl}`);

  if (!res.ok) throw res.status.toString();

  return await res.json() as spotifyAuthUrlResponse;
};


export const authStatus = async (sessionId: string): Promise<boolean> => {
  const res = await fetch(`${SERVER_LINK}/api/Spotify/auth-status/${sessionId}`);

  if (!res.ok) throw res.status.toString();

  const data = await res.json() as { status: 'success' | 'denied' | 'pending' };

  switch (data.status) {
    case "success":
      return true;
    case "denied":
      return false;
    default:
      await new Promise(resolve => setTimeout(resolve, 1000))
      return authStatus(sessionId)
  }
}

export const getSpotifyToken = async (): Promise<string> => {
  const res = await fetch("https://www.oneplay.work.gd/api/Spotify/token", {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  if (!res.ok) {
    console.error("TokenSpotify error", res.status, res.statusText);
    throw new Error(`HTTP ${res.status}`);
  }

  const data = (await res.json()) as { accessToken: string };
  return data.accessToken;
};



export const getSpotifyRefreshToken = async (): Promise<string> => {
  const res = await fetch(`${SERVER_LINK}/api/Spotify/refresh`, {
    method: "POST",
    headers: { Accept: "*/*" },
    body: "",
  });

  if (!res.ok) {
    console.log(`RefreshSpotify ${res}`)
    throw res.status.toString();
  }

  const data = await res.json() as { accessToken: string }
  return data.accessToken;
}