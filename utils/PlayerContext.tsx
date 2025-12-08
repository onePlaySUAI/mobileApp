import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { SongParams } from '../types/components';
import {
  setActiveTab,
  setActivePlaylist,
  setNowPlayingSong,
  setPlaylists,
  setModalVisible,
  setModalCurrentSong,
  toggleFavorite,
  setPlaylistModalVisible,
  setPlaylistModalCurrent,
  MusicState,
} from '../store/reducers';

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
  modalCurrentSong: SongParams | null;
  setModalCurrentSong: (song: SongParams) => void;
  openModal: (song: SongParams) => void;
  closeModal: () => void;
  handlePlayPause: () => void;
  handleFavorite: () => void;
  playlistModalVisible: boolean;
  setPlaylistModalVisible: (visible: boolean) => void;
  playlistModalCurrent: { id: string; name: string };
  setPlaylistModalCurrent: (playlist: { id: string; name: string }) => void;
  openPlaylistModal: (id: string, name: string) => void;
  closePlaylistModal: () => void;
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

  const activePlaylist =
    musicState.playlists.find(
      (p: (typeof musicState.playlists)[0]) =>
        p.id === musicState.activePlaylistId
    ) || null;

  const setActivePlaylistWrapper = (
    playlist: MusicState['playlists'][0] | null
  ) => {
    dispatch(setActivePlaylist(playlist?.id || null));
  };

  const openModal = (song: SongParams): void => {
    dispatch(setModalVisible(true));
    dispatch(setModalCurrentSong(song));
  };

  const closeModal = (): void => {
    dispatch(setModalVisible(false));
  };

  const handlePlayPause = (): void => {
    if (musicState.nowPlayingSong) {
      dispatch(
        setNowPlayingSong({
          ...musicState.nowPlayingSong,
          isPlaying: !musicState.nowPlayingSong.isPlaying,
        })
      );
    }
  };

  const handleFavorite = (): void => {
    dispatch(toggleFavorite());
  };

  const openPlaylistModal = (id: string, name: string): void => {
    dispatch(setPlaylistModalVisible(true));
    dispatch(setPlaylistModalCurrent({ id, name }));
  };

  const closePlaylistModal = (): void => {
    dispatch(setPlaylistModalVisible(false));
  };

  const value: MusicContextType = {
    activeTab: musicState.activeTab,
    setActiveTab: (tab: 'search' | 'library') => dispatch(setActiveTab(tab)),
    activePlaylist,
    setActivePlaylist: setActivePlaylistWrapper,
    nowPlayingSong: musicState.nowPlayingSong,
    setNowPlayingSong: (song: MusicState['nowPlayingSong']) =>
      dispatch(setNowPlayingSong(song)),
    playlists: musicState.playlists,
    setPlaylists: (playlists: MusicState['playlists']) =>
      dispatch(setPlaylists(playlists)),
    modalVisible: musicState.modalVisible,
    setModalVisible: (visible: boolean) => dispatch(setModalVisible(visible)),
    modalCurrentSong: musicState.modalCurrentSong,
    setModalCurrentSong: (song: SongParams) =>
      dispatch(setModalCurrentSong(song)),
    openModal,
    closeModal,
    handlePlayPause,
    handleFavorite,
    playlistModalVisible: musicState.playlistModalVisible,
    setPlaylistModalVisible: (visible: boolean) =>
      dispatch(setPlaylistModalVisible(visible)),
    playlistModalCurrent: musicState.playlistModalCurrent,
    setPlaylistModalCurrent: (playlist: { id: string; name: string }) =>
      dispatch(setPlaylistModalCurrent(playlist)),
    openPlaylistModal,
    closePlaylistModal,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
