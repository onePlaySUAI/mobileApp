import LoadingScreen from "@/assets/components/loading";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {authStatus, getSpotifyToken} from "@/assets/serverCalls/spotify";
import {setSpotifyToken} from "@/store/spotifySlice";
import {Redirect} from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function AwaitSpotifyResponse() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isDarkmode = useColorScheme() === 'dark';
  const sessionId = useSelector((state: RootState) => state.spotify.sessionId);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!sessionId) {
      setShouldRedirect(true);
      return;
    }
    authStatus(sessionId)
      .then(async (res) => {
        const spotifyAccess = await getSpotifyToken()
        dispatch(setSpotifyToken(spotifyAccess));
        await SecureStore.setItemAsync('spotify', spotifyAccess);
      },
        () => {}
      ).finally(
      () => setShouldRedirect(true)
    )

  }, [dispatch, sessionId]);

  if (shouldRedirect) return <Redirect href={'/home'} />

  return <LoadingScreen isDarkMode={isDarkmode} />
}