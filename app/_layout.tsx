import { Stack } from "expo-router";
import {Provider} from "react-redux";
import store from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={ {headerShown: false} }>
        <Stack.Screen name='(screens)/home' />
        <Stack.Screen name='(screens)/register' />
        <Stack.Screen name="(screens)/awaitSpotifyResponse" />
      </Stack>
    </Provider>
  );
}
