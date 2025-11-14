import {registerResponse} from "@/assets/serverCalls/register";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import SERVER_LINK from "@/assets/serverCalls/SERVER_LINK";

interface storedUser extends registerResponse {
  email?: string,
}

/*
* Updates user info based on a token
* saved in SecureStore
* **/
export default async function updateUserByToken (): Promise<registerResponse> {
  const userSaved = await getItemAsync('user');
  if (userSaved === null) throw new Error('NO_REFRESH_TOKEN_STORED');

  const user = JSON.parse(userSaved) as storedUser;
  let receivedUser;
  try {
    receivedUser = await refreshToken(user.refreshToken);
  } catch (e) {
    throw e;
  }

  await setItemAsync('user', JSON.stringify({
    userId: receivedUser.userId,
    userName: receivedUser.userName,
    token: receivedUser.token,
    refreshToken: receivedUser.refreshToken,
    email: user.email ?? '',
  }))

  return receivedUser;
}

const refreshToken = async (token: string): Promise<registerResponse> => {
  const res = await fetch(`${SERVER_LINK}/api/Auth/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      refreshToken: token,
    }),
  });

  if (!res.ok) throw res.status.toString();

  const data = await res.json();
  return data as registerResponse;
}