import { Stack } from "expo-router";
import {Provider} from "react-redux";
import store from '../store/store';
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    console.log('App started. SERVER_LINK:', process.env.EXPO_PUBLIC_SERVER_LINK);
  }, []);

  return (
    <Provider store={store}>
      <Stack screenOptions={ {headerShown: false} }>
        <Stack.Screen name='(screens)/home' />
        <Stack.Screen name='(screens)/login' />
        <Stack.Screen name='(screens)/register' />
      </Stack>
    </Provider>
  );
}
