import { TextStyle, ViewStyle } from "react-native";
import { Playlist } from "./store";
import { AppTheme } from "@/assets/constants/colors";

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
  appTheme: AppTheme;
  playlist: Playlist;
  onPress?: () => void;
  onDotsPress?: () => void;
}

export interface PlaylistContentProps {
  appTheme: AppTheme;
  playlist: Playlist;
  onAddMusic?: () => void;
  openModal: (song: SongParams) => void;
  closeModal: () => void;
}

// Modal component types
export interface TrackOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  appTheme: AppTheme;
  song: SongParams | null;
}

// Mini player component types
export interface MiniPlayerProps {
  song?: {
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
    isFavorite?: boolean;
  } | null;
  appTheme: AppTheme,
  onPlayPause?: () => void;
  onFavorite?: () => void;
}

// Header component types
export interface HeaderProps {
  page: 'search' | 'library';
}

export interface HeaderParams {
  params: HeaderProps;
}

export interface PlayListHeaderProps {
  onBack?: () => void;
  title?: string;
  onPlayPause?: (isPlaying: boolean) => void;
}

// Other component types
export interface EmptyStateProps {
  appTheme: AppTheme,
  title?: string;
  description?: string;
}


export interface LibraryTabContentProps {
  appTheme: AppTheme;
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
  onAddPlaylist: () => void;
  onDotsPress: (playlist: Playlist) => void;
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

export interface AppStyle {
  safeAreaProvider: ViewStyle;
  container: ViewStyle;
  Tab: ViewStyle;
  text: TextStyle;
  songsPlaceHolder: ViewStyle;
  songsContent: ViewStyle;
}

export interface PlaylistOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  appTheme: AppTheme;
  playlist: Playlist | null;
  onRename?: () => void;
  onEditCover?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export interface ProfileHeaderProps {
  appTheme: AppTheme;
  title?: string;
  showBackButton?: boolean;
}

export interface ProfileAvatarProps {
  appTheme: AppTheme;
}

export interface ProfileInfoProps {
  appTheme: AppTheme;
}

export interface ProfileServicesProps {
  appTheme: AppTheme;
}

export interface BottomNavigationProps {
  appTheme: AppTheme;
  activeTab: 'search' | 'library';
  onTabPress: (tab: 'search' | 'library') => void;
}

export interface BottomNavigationStyle {
  container: ViewStyle;
  tab: ViewStyle;
  activeTab: ViewStyle;
  inactiveIcon: TextStyle;
  gradientIcon: ViewStyle;
}