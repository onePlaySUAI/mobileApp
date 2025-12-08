import {SafeAreaView, useColorScheme} from 'react-native';
import {useState} from 'react';
import { getHomeStyle } from "@/assets/styles/home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/assets/components/home/customHeader";
import SongOptionsModal from "@/assets/components/songOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import NowPlayingBar from "@/assets/components/home/nowPlayingBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {selectCurrentSong, SongType} from "@/store/songsSlice";
import SongsPlaceholder from "@/assets/components/home/songsPlaceholder";
import { getAppTheme } from '@/assets/constants/colors';
import PlaylistContent from '@/assets/components/home/PlayList/PlayList';
import LibraryTabContent from '@/assets/components/home/libraryTabContent';
import { Playlist } from '@/types/store';
import { mockPlaylists } from '@/mocks/mockPlaylists';


export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCurrentSong, setCurrentModalSong] = useState<SongType | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const [playlistModalCurrent, setPlaylistModalCurrent] = useState({ id: '', name: '' });

  const songs = useSelector((state: RootState) => state.song.list);
  const nowPlayingSong = useSelector((state: RootState) => selectCurrentSong(state.song));

  const isDarkmode = useColorScheme() === 'dark';
  const appTheme = getAppTheme(useColorScheme())

  const openModal = (song: SongType): void => {
    setModalVisible(true);
    setCurrentModalSong(song);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  const openPlaylistModal = (id: string, name: string): void => {
    setPlaylistModalCurrent({ id, name });
    setPlaylistModalVisible(true);
  };

  const style = getHomeStyle(isDarkmode);


  
  return (
    <SafeAreaProvider style={style.safeAreaProvider}>
      <CustomHeader 
        page='Home'
        isDarkmode={isDarkmode}
      />
      <SafeAreaView style={style.container}>
        {(activeTab === 'search') && (
          <SongsPlaceholder
            isDarkmode={isDarkmode}
            nowPlayingSongId={nowPlayingSong?.id ?? ''}
            openModal={openModal}
            songs={songs}
          />
        )}
        {activeTab === 'library' && activePlaylist === null && (
          <LibraryTabContent
              appTheme={appTheme}
              playlists={playlists}
              onPlaylistPress={(playlist) => setActivePlaylist(playlist)}
              onAddPlaylist={() => console.log('Add new')}
              onDotsPress={(playlist) =>
                openPlaylistModal(playlist.id, playlist.name)
              }
            />
        )}
        {activeTab === 'library' && activePlaylist !== null && (
            <PlaylistContent
              appTheme={appTheme}
              playlist={activePlaylist}
              openModal={openModal}
              closeModal={closeModal}
            ></PlaylistContent>
          )}
      </SafeAreaView>
      {/* <HomeHeader 
        params={{ page: activeTab }}
      /> */}

      
        

      <NowPlayingBar
        song={nowPlayingSong === null ? undefined : nowPlayingSong}
        isDarkmode={isDarkmode}
      />

      <BottomNavigation appTheme={appTheme} activeTab={activeTab} onTabPress={setActiveTab} />

      <SongOptionsModal
        isDarkMode={isDarkmode}
        onClose={closeModal}
        visible={modalVisible && modalCurrentSong !== null}
        song={modalCurrentSong as SongType}
      />

    </SafeAreaProvider>
  );
}
