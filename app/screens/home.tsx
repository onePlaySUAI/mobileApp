import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import { Redirect } from 'expo-router';
import {getHomeStyle} from "@/assets/styles/home";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TrackOptionsModal from "@/assets/components/trackOptionsModal";
import BottomNavigation from "@/assets/components/bottomNavigation";
import MiniPlayer from "@/assets/components/miniPlayer";
import SearchTabContent from "@/assets/components/home/searchTabContent";
import LibraryTabContent from '@/assets/components/home/libraryTabContent';
import HomeHeader from '@/assets/components/home/homeHeader';
import PlaylistContent from '@/assets/components/home/playlist/Playlist';
import PlaylistHeader from '@/assets/components/home/playlist/PlaylistHeader';
import { useMusic } from '../utils/PlayerContext';
import { useAuthentication } from '../utils/useAuthentication';

export default function Home() {
  const { isAuthenticated } = useAuthentication();
  const {
    activeTab,
    setActiveTab,
    activePlaylist,
    setActivePlaylist,
    nowPlayingSong,
    playlists,
    modalVisible,
    modalCurrentSong,
    openModal,
    closeModal,
    handlePlayPause,
    handleFavorite,
  } = useMusic();
  const colorScheme = useColorScheme();

  if (!isAuthenticated) {
    return <Redirect href="/screens/register" />;
  }

  const style = getHomeStyle(colorScheme === 'dark');

  return (
    <SafeAreaProvider
      style={style.safeAreaProvider}>
      {/* SafeAreaView is deprecated, but there's no documentation online yet.
         May change when docs become available */}
      {
        (activeTab === 'search' || (activeTab === 'library' && activePlaylist === null)) &&
        <HomeHeader params={{ page: activeTab }} />
      }
      {
        (activeTab === 'library' && activePlaylist !== null) &&
        <PlaylistHeader isDark={true} onBack={() => setActivePlaylist(null)} title={activePlaylist.name}></PlaylistHeader>
      }

      <SafeAreaView style={style.Tab}>
        {/* Render content based on active tab */}
        {
          activeTab === 'search' &&
          <SearchTabContent
            openModal={openModal}
            closeModal={closeModal}
          />
        }
        {
          activeTab === 'library' && activePlaylist === null &&
          <LibraryTabContent
            playlists={playlists}
            onPlaylistPress={(playlist) => setActivePlaylist(playlist)}
            onAddPlaylist={() => console.log('Add new')}
          />
        }
        {
          activeTab === 'library' && activePlaylist !== null &&
          <PlaylistContent playlist={activePlaylist}></PlaylistContent>
        }
      </SafeAreaView>

      <MiniPlayer
        song={nowPlayingSong}
        onPlayPause={handlePlayPause}
        onFavorite={handleFavorite}
      />

      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <TrackOptionsModal
        visible={modalVisible}
        onClose={closeModal}
        song={modalCurrentSong}
        isDarkMode={colorScheme === 'dark'}
      />
    </SafeAreaProvider>
  );
}