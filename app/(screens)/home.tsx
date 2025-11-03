import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import {getHomeStyle} from "@/assets/styles/home";
import {SafeAreaProvider} from "react-native-safe-area-context";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/nowPlayingBar";
import SearchTabContent from "@/assets/components/home/searchTabContent";
import LibraryTabContent from '@/assets/components/home/libraryTabContent';
import SearchHeader from '@/assets/components/home/searchHeader';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<{title: string, artist: string}>({title: 'null', artist: 'null'});
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
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

  const myPlaylists = [
    { id: '1', name: 'My Hits', count: '5 songs' },
    { id: '2', name: 'Chill Vibes', count: '12 songs' },
  ];


  return (
    <SafeAreaProvider
      style={style.safeAreaProvider}>
      {/*'SafeAreaView deprecated'*/}
      {/*Однако в сети НОЛЬ доки, поэтому не меняю на safe-area-context.
         Может быть, поменяю, как появится дока*/}
      <SearchHeader params={{ page: activeTab }} />
      
      <SafeAreaView style={style.Tab}>
        {/* Отображаем контент в зависимости от вкладки */}
        {activeTab === 'search' && <SearchTabContent openModal={openModal} closeModal={closeModal}/>}
        {
          activeTab === 'library' && 
          <LibraryTabContent
            playlists={myPlaylists}
            onPlaylistPress={(playlist) => console.log(playlist)}
            onAddPlaylist={() => console.log('Add new')}
          />
        }
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
        visible={modalVisible}
        onClose={closeModal}
        song={modalCurrentSong}
        isDarkMode={colorScheme === 'dark'}
      />
    </SafeAreaProvider>
  );
}