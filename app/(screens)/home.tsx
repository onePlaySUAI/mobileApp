import {SafeAreaView, ScrollView, useColorScheme, View, Text} from 'react-native';
import { Redirect } from 'expo-router';
import {useEffect, useState} from 'react';
import { getHomeStyle } from "@/assets/styles/home";
import Song from "@/assets/components/song";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/nowPlayingBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import type {AppDispatch} from "@/store/store";
import {setCurrentSong, setSongList, SongItem} from "@/store/songsSlice";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<{title: string, artist: string}>({title: 'null', artist: 'null'});
  const [activeTab, setActiveTab] = useState<'search' | 'queue'>('search');

  const songs = useSelector((state: RootState) => state.song.list);
  const nowPlayingSong = useSelector((state: RootState) => state.song.current);
  const dispatch = useDispatch<AppDispatch>();

  const colorScheme = useColorScheme();

  const openModal = (title: string, artist: string): void => {
    setModalVisible(true);
    setCurrentModalSong({ title, artist });
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  if (!isAuthenticated) {
    return <Redirect href="/register" />;
  }

  const style = getHomeStyle(colorScheme === 'dark');

  useEffect(() => {
    const fetchSongs = async () => {
      await new Promise(res => setTimeout(res, 1000));

      const fakeSongs: SongItem[] = [
        {
          id: '1',
          title: 'I hate you',
          artist: 'Nikita',
          albumCover: 'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
          audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
          source: 'Youtube',
        },
        {
          id: '2',
          title: 'Song 2',
          artist: 'Blur',
          albumCover: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
          audioUrl: 'https://www.myinstants.com/media/sounds/liutyi-ponos.mp3',
          source: 'Spotify',
        },
      ];

      dispatch(setSongList(fakeSongs));
    };

    fetchSongs();
  }, [dispatch]);


  return (
    <SafeAreaProvider style={style.safeAreaProvider}>
      {/* Header */}
      <CustomHeader params={{ page: 'Home' }} />

      {/* Songs */}
      <SafeAreaView style={style.container}>
        <ScrollView style={style.songsPlaceHolder} contentContainerStyle={style.songsContent}>
          {songs.length === 0 ? (
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text style={{color: 'gray'}}>
                Loading songs...
              </Text>
            </View>
          ) : (
            songs.map((songItem, index) => (
              <Song
                key={index}
                params={songItem}
                onDotsPress={() => openModal(songItem.title, songItem.artist)}
                onPlay={() => dispatch(setCurrentSong(songItem))}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Audio Player */}
      <NowPlayingBar song={nowPlayingSong} />

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {/* Modal */}
      <SongOptionsModal
        isDarkMode={colorScheme === 'dark'}
        onClose={closeModal}
        visible={modalVisible}
        song={{ title: modalCurrentSong.title, artist: modalCurrentSong.artist }}
      />
    </SafeAreaProvider>
  );
}
