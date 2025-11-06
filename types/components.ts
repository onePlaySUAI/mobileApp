// Song component types
export interface SongParams {
  title: string;
  artist: string;
  source: 'Spotify' | 'Youtube' | 'Download';
  albumCover: string;
  active?: boolean;
}

export interface SongProps {
  params: SongParams;
  onDotsPress?: () => void;
}

// Playlist component types
export interface PlaylistItemProps {
  playlist: {
    id: string;
    name: string;
    songs: SongParams[];
  };
  onPress?: () => void;
}

export interface PlaylistContentProps {
  playlist: {
    id: string;
    name: string;
    songs: SongParams[];
  };
  onAddMusic?: () => void;
}

// Modal component types
export interface TrackOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  song: SongParams;
}

// Mini player component types
export interface MiniPlayerProps {
  onPress?: () => void;
}

// Header component types
export interface HeaderProps {
  isDark: boolean;
  title?: string;
  onBack?: () => void;
}

export interface HeaderParams {
  isDark: boolean;
  title?: string;
  onBack?: () => void;
}

// Other component types
export interface EmptyStateProps {
  title: string;
  description: string;
  iconName?: string;
}

export interface LibraryTabContentProps {
  playlists: {
    id: string;
    name: string;
    songs: SongParams[];
  }[];
  onPlaylistPress: (playlist: {
    id: string;
    name: string;
    songs: SongParams[];
  }) => void;
}

export interface SearchTabContentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Icon component types
export interface IconProps {
  size?: number;
  color?: string;
}
