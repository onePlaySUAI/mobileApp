import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import updateUserByToken from "@/assets/serverCalls/refreshToken";
import {useEffect, useState} from "react";
import {registerResponse} from "@/assets/serverCalls/register";
import {setUser} from "@/store/userSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import LoadingScreen from "@/assets/components/loading";
import {useColorScheme} from "react-native";

interface userInfo extends registerResponse {
  email?: string;
}

/**
 * App's entry point
 * Checks if user is registered
 * */
export default function Index() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isDarkmode = useColorScheme() === 'dark';

  const getUser = async () => {
    await SecureStore.deleteItemAsync('user')
    const savedUser = await SecureStore.getItemAsync("user");

    if (!savedUser) {
      setIsRegistered(false);
      return;
    }

    const user = JSON.parse(savedUser) as userInfo;

    if (user.refreshToken) {
      try {
        const updatedUser = await updateUserByToken();
        await SecureStore.setItemAsync(
          "user",
          JSON.stringify({
            userId: updatedUser.userId,
            token: updatedUser.token,
            userName: updatedUser.userName,
            email: user.email ?? "",
            refreshToken: updatedUser.refreshToken,
          })
        );

        dispatch(
          setUser({
            name: updatedUser.userName,
            email: user.email ?? "",
          })
        );

        setIsRegistered(true);
      } catch {
        setIsRegistered(false);
      }
    } else {
      setIsRegistered(false);
    }
  };


  useEffect(() => {
    getUser();
  }, []);


  switch (isRegistered) {
    case true:
      return <Redirect href={'/(screens)/home'} />
    case false:
      return <Redirect href={'/(screens)/register'} />
    default:
      return <LoadingScreen isDarkMode={isDarkmode} />
  }

}
