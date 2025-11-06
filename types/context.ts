import { ReactNode } from 'react';

// Music context types
export interface MusicContextType {
  activeTab: 'search' | 'library';
  setActiveTab: (tab: 'search' | 'library') => void;
  activePlaylist: {
    id: string;
    name: string;
    songs: {
      title: string;
      artist: string;
      source: 'Spotify' | 'Youtube' | 'Download';
      albumCover: string;
      active?: boolean;
    }[];
  } | null;
  setActivePlaylist: (
    playlist: {
      id: string;
      name: string;
      songs: {
        title: string;
        artist: string;
        source: 'Spotify' | 'Youtube' | 'Download';
        albumCover: string;
        active?: boolean;
      }[];
    } | null
  ) => void;
  nowPlayingSong: {
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
  } | null;
  setNowPlayingSong: (
    song: {
      title: string;
      artist: string;
      albumCover?: string;
      isPlaying?: boolean;
    } | null
  ) => void;
  playlists: {
    id: string;
    name: string;
    songs: {
      title: string;
      artist: string;
      source: 'Spotify' | 'Youtube' | 'Download';
      albumCover: string;
      active?: boolean;
    }[];
  }[];
  setPlaylists: (
    playlists: {
      id: string;
      name: string;
      songs: {
        title: string;
        artist: string;
        source: 'Spotify' | 'Youtube' | 'Download';
        albumCover: string;
        active?: boolean;
      }[];
    }[]
  ) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modalCurrentSong: { title: string; artist: string };
  setModalCurrentSong: (song: { title: string; artist: string }) => void;
  openModal: (title: string, artist: string) => void;
  closeModal: () => void;
  handlePlayPause: () => void;
  handleFavorite: () => void;
}

export interface MusicProviderProps {
  children: ReactNode;
}

// Search hook types
export interface UseSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredSongs: {
    title: string;
    artist: string;
    source: 'Spotify' | 'Youtube' | 'Download';
    albumCover: string;
    active?: boolean;
  }[];
}
