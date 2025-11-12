import {registerResponse} from "@/assets/serverCalls/register";

export default async function serverLogin (name: string, password: string): Promise<registerResponse> {
  const SERVER_LINK = process.env.EXPO_PUBLIC_SERVER_LINK as string;
  const res = await fetch(`${SERVER_LINK}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name,
      password,
    })
  });

  if (!res.ok) throw res.status.toString();

  const data = await res.json();
  return data as registerResponse;
}