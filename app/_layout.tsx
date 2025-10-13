import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={ {headerShown: false} }>
      <Stack.Screen name='(screens)/home' />
      <Stack.Screen name='(screens)/register' />
    </Stack>
  );
}
