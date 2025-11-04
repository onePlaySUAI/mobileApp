import { Stack } from "expo-router";
import {Provider} from "react-redux";
import store from '../store/store';
import { PlayerProvider } from './utils/PlayerContext';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <Stack screenOptions={ {headerShown: false} }>
          <Stack.Screen name='screens/home' />
          <Stack.Screen name='screens/register' />
          <Stack.Screen name='screens/profile' />
          <Stack.Screen name="screens/PlaylistDetail" />
        </Stack>
      </PlayerProvider>
    </Provider>
  );
}
