import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import {getHomeStyle} from "@/assets/styles/home";
import Song from "@/assets/components/song";
import {SafeAreaProvider} from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/nowPlayingBar";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<{title: string, artist: string}>({title: 'null', artist: 'null'});
  const [activeTab, setActiveTab] = useState<'search' | 'queue'>('search');
  const [nowPlayingSong, setNowPlayingSong] = useState<{
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
  } | null>({
    title: 'I hate you',
    artist: 'Иван Иваныч',
    albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
    isPlaying: false
  });
  const colorScheme = useColorScheme();

  const openModal = (title: string, artist: string): void => {
    setModalVisible(true);
    setCurrentModalSong({title, artist});
  };
  const closeModal = (): void => {
    setModalVisible(false)
  };

  const handlePlayPause = (): void => {
    if (nowPlayingSong) {
      setNowPlayingSong({
        ...nowPlayingSong,
        isPlaying: !nowPlayingSong.isPlaying
      });
    }
  };

  const handleFavorite = (): void => {
    // Handle favorite functionality
    console.log('Favorite pressed');
  };


  if (!isAuthenticated) {
    return <Redirect href="/register" />;
  }

  const style = getHomeStyle(colorScheme === 'dark');

  return (
    <SafeAreaProvider
      style={style.safeAreaProvider}>
      {/*'SafeAreaView deprecated'*/}
      {/*Однако в сети НОЛЬ доки, поэтому не меняю на safe-area-context.
         Может быть, поменяю, как появится дока*/}
      <CustomHeader params={{ page: 'Home' }} />
      <SafeAreaView style={style.container}>
        <ScrollView style={style.songsPlaceHolder} contentContainerStyle={style.songsContent}>
          <Song params={{
            title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
            artist: 'THE John',
            albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
            source: 'Spotify',
          }}
          onDotsPress={() => openModal('quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf', 'THE John')}
          />
          <Song params={{
            title: 'I hate you',
            artist: 'Nikita',
            albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
            source: 'Youtube',
            active: true,
          }}
          onDotsPress={() => openModal('I hate you', 'Nikita')} // Пока что вручную, это нужно задавать при создании компонента в цикле
          />
        </ScrollView>
        </SafeAreaView>
      
      <NowPlayingBar
        song={nowPlayingSong}
        onPlayPause={handlePlayPause}
        onFavorite={handleFavorite}
      />
      
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      
      <SongOptionsModal
        isDarkMode={colorScheme === 'dark'}
        onClose={closeModal}
        visible={modalVisible}
        song={{title: modalCurrentSong.title, artist: modalCurrentSong.artist}}
      />
    </SafeAreaProvider>
  );
}