import {registerResponse} from "@/assets/serverCalls/register";

export default async function serverLogin (name: string, password: string): Promise<registerResponse> {
  const SERVER_LINK = process.env.EXPO_PUBLIC_SERVER_LINK as string;
  try {
    const res = await fetch(`${SERVER_LINK}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        password,
      })
    });

    if (!res.ok) {
      throw res.status.toString();
    }

    const data = await res.json();
    return data as registerResponse;
  } catch (error) {
    console.error('Login fetch error:', error);
    throw error;
  }
}