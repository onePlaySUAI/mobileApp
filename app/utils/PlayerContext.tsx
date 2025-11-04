import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setActiveTab,
  setActivePlaylist,
  setNowPlayingSong,
  setPlaylists,
  setModalVisible,
  setModalCurrentSong,
  MusicState
} from '../../store/reducers';

interface MusicContextType {
  activeTab: 'search' | 'library';
  setActiveTab: (tab: 'search' | 'library') => void;
  activePlaylist: MusicState['playlists'][0] | null;
  setActivePlaylist: (playlist: MusicState['playlists'][0] | null) => void;
  nowPlayingSong: MusicState['nowPlayingSong'];
  setNowPlayingSong: (song: MusicState['nowPlayingSong']) => void;
  playlists: MusicState['playlists'];
  setPlaylists: (playlists: MusicState['playlists']) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modalCurrentSong: { title: string; artist: string };
  setModalCurrentSong: (song: { title: string; artist: string }) => void;
  openModal: (title: string, artist: string) => void;
  closeModal: () => void;
  handlePlayPause: () => void;
  handleFavorite: () => void;
}

interface MusicProviderProps {
  children: ReactNode;
}

const PlayerContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const PlayerProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const musicState = useSelector((state: RootState) => state.music);

  const activePlaylist = musicState.playlists.find((p: typeof musicState.playlists[0]) => p.id === musicState.activePlaylistId) || null;

  const setActivePlaylistWrapper = (playlist: MusicState['playlists'][0] | null) => {
    dispatch(setActivePlaylist(playlist?.id || null));
  };

  const openModal = (title: string, artist: string): void => {
    dispatch(setModalVisible(true));
    dispatch(setModalCurrentSong({ title, artist }));
  };

  const closeModal = (): void => {
    dispatch(setModalVisible(false));
  };

  const handlePlayPause = (): void => {
    if (musicState.nowPlayingSong) {
      dispatch(setNowPlayingSong({
        ...musicState.nowPlayingSong,
        isPlaying: !musicState.nowPlayingSong.isPlaying
      }));
    }
  };

  const handleFavorite = (): void => {
    console.log('Favorite pressed');
  };

  const value: MusicContextType = {
    activeTab: musicState.activeTab,
    setActiveTab: (tab: 'search' | 'library') => dispatch(setActiveTab(tab)),
    activePlaylist,
    setActivePlaylist: setActivePlaylistWrapper,
    nowPlayingSong: musicState.nowPlayingSong,
    setNowPlayingSong: (song: MusicState['nowPlayingSong']) => dispatch(setNowPlayingSong(song)),
    playlists: musicState.playlists,
    setPlaylists: (playlists: MusicState['playlists']) => dispatch(setPlaylists(playlists)),
    modalVisible: musicState.modalVisible,
    setModalVisible: (visible: boolean) => dispatch(setModalVisible(visible)),
    modalCurrentSong: musicState.modalCurrentSong,
    setModalCurrentSong: (song: { title: string; artist: string }) => dispatch(setModalCurrentSong(song)),
    openModal,
    closeModal,
    handlePlayPause,
    handleFavorite,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};