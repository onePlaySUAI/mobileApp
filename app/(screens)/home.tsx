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
import HomeHeader from '@/assets/components/home/homeHeader';
import PlaylistContent from '@/assets/components/home/PlayList/PlayList';
import PlayListHeader from '@/assets/components/home/PlayList/PlayListHeader';
import { Playlist } from '@/assets/components/home/PlayList/playListItem';
import { songParams } from '@/assets/components/song';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<{title: string, artist: string}>({title: 'null', artist: 'null'});
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  const [activePlayList, setActivePlayList] = useState<Playlist | null>(null);
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

  const songs1: songParams[] = [
    {
      title: 'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
      artist: 'THE John',
      albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
      source: 'Spotify',
    }
  ]
  const songs2: songParams[] = []
  const myPlaylists: Playlist[] = [
    {id: '1', name: 'My Hits', songs: songs1},
    {id: '2', name: 'Chill Vibes', songs: songs2},
  ];


  return (
    <SafeAreaProvider
      style={style.safeAreaProvider}>
      {/*'SafeAreaView deprecated'*/}
      {/*Однако в сети НОЛЬ доки, поэтому не меняю на safe-area-context.
         Может быть, поменяю, как появится дока*/}
      {
        (activeTab === 'search' || (activeTab === 'library' && activePlayList === null)) &&
        <HomeHeader params={{ page: activeTab }} />
      }
      {
        (activeTab === 'library' && activePlayList !== null) &&
        <PlayListHeader isDark={true} onBack={() => setActivePlayList(null)} title={activePlayList.name}></PlayListHeader>
      }
      
      <SafeAreaView style={style.Tab}>
        {/* Отображаем контент в зависимости от вкладки */}
        {
          activeTab === 'search' && 
          <SearchTabContent 
            openModal={openModal}
            closeModal={closeModal}
          />
        }
        {
          activeTab === 'library' && activePlayList === null && 
          <LibraryTabContent
            playlists={myPlaylists}
            onPlaylistPress={(playlist) => setActivePlayList(playlist)}
            onAddPlaylist={() => console.log('Add new')}
          />
        }
        {
          activeTab === 'library' && activePlayList !== null &&
          <PlaylistContent playlist={activePlayList}></PlaylistContent>
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