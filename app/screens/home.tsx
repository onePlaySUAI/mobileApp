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

import PlaylistOptionsModal from "@/assets/components/playlistOptionsModal";
import { useMusic } from '../utils/PlayerContext';
import { useAuthentication } from '../utils/useAuthentication';
import PlaylistContent from '@/assets/components/home/PlayList/PlayList';
import PlayListHeader from '@/assets/components/home/PlayList/PlayListHeader';

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
    playlistModalVisible,
    playlistModalCurrent,
    openPlaylistModal,
    closePlaylistModal,
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
        <PlayListHeader isDark={true} onBack={() => setActivePlaylist(null)} title={activePlaylist.name}></PlayListHeader>
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
            onDotsPress={(playlist) => openPlaylistModal(playlist.id, playlist.name)}
          />
        }
        {
          activeTab === 'library' && activePlaylist !== null &&
          <PlaylistContent playlist={activePlaylist} openModal={openModal} closeModal={closeModal}></PlaylistContent>
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

      <PlaylistOptionsModal
        visible={playlistModalVisible}
        onClose={closePlaylistModal}
        playlist={playlists.find(p => p.id === playlistModalCurrent.id) || null}
        isDarkMode={colorScheme === 'dark'}
        onRename={() => console.log('Rename playlist')}
        onEditCover={() => console.log('Edit cover')}
        onShare={() => console.log('Share playlist')}
        onDelete={() => console.log('Delete playlist')}
      />
    </SafeAreaProvider>
  );
}