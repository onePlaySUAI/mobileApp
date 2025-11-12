export interface registerResponse {
  userId: string,
  userName: string,
  token: string,
}

export default async function serverRegister (name: string, password: string, confirmPassword: string):
  Promise<registerResponse> {
    const SERVER_LINK = process.env.EXPO_PUBLIC_SERVER_LINK as string;
    const res = await fetch(`${SERVER_LINK}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        verifyPassword: confirmPassword,
      })
    });

    if (!res.ok) throw res.status.toString();

    const data = await res.json();
    return data as registerResponse;
  }