import {SafeAreaView, useColorScheme} from 'react-native';
import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import {getHomeStyle} from "@/assets/styles/home";
import Song from "@/assets/components/song";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Simulate checking authentication status
    setTimeout(() => setIsAuthenticated(true), 2000);
  }, []);

  if (!isAuthenticated) {
    return <Redirect href="/register" />;
  }

  const style = getHomeStyle(colorScheme === 'dark');

  return (
    <SafeAreaProvider>
      {/*'SafeAreaView deprecated'*/}
      {/*Однако в сети НОЛЬ доки, поэтому не меняю на safe-area-context.
         Может быть, поменяю, как появится дока*/}
      <SafeAreaView style={style.container}>
        <Song params={{
          title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
          artist: 'THE John',
          albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
          source: 'Spotify',
        }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}