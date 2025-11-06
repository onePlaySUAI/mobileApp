// Action type constants
export const SET_USER = 'SET_USER';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_ACTIVE_PLAYLIST = 'SET_ACTIVE_PLAYLIST';
export const SET_NOW_PLAYING_SONG = 'SET_NOW_PLAYING_SONG';
export const SET_PLAYLISTS = 'SET_PLAYLISTS';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
export const SET_MODAL_CURRENT_SONG = 'SET_MODAL_CURRENT_SONG';

// User state types
export interface UserState {
  name: string;
  email: string;
  // token: ''; когда ручку будем делать
}

export interface SetUserAction {
  type: 'SET_USER';
  payload: UserState;
  [key: string]: any; // ✅ разрешаем дополнительные поля
}

export type UserAction = SetUserAction;

// Music state types
export interface Song {
  title: string;
  artist: string;
  source: 'Spotify' | 'Youtube' | 'Download';
  albumCover: string;
  active?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export interface NowPlayingSong {
  title: string;
  artist: string;
  albumCover?: string;
  isPlaying?: boolean;
}

export interface MusicState {
  activeTab: 'search' | 'library';
  activePlaylistId: string | null;
  nowPlayingSong: NowPlayingSong | null;
  playlists: Playlist[];
  modalVisible: boolean;
  modalCurrentSong: { title: string; artist: string };
}

export interface SetActiveTabAction {
  type: 'SET_ACTIVE_TAB';
  payload: 'search' | 'library';
  [key: string]: any;
}

export interface SetActivePlaylistAction {
  type: 'SET_ACTIVE_PLAYLIST';
  payload: string | null;
  [key: string]: any;
}

export interface SetNowPlayingSongAction {
  type: 'SET_NOW_PLAYING_SONG';
  payload: MusicState['nowPlayingSong'];
  [key: string]: any;
}

export interface SetPlaylistsAction {
  type: 'SET_PLAYLISTS';
  payload: MusicState['playlists'];
  [key: string]: any;
}

export interface SetModalVisibleAction {
  type: 'SET_MODAL_VISIBLE';
  payload: boolean;
  [key: string]: any;
}

export interface SetModalCurrentSongAction {
  type: 'SET_MODAL_CURRENT_SONG';
  payload: { title: string; artist: string };
  [key: string]: any;
}

export type MusicAction =
  | SetActiveTabAction
  | SetActivePlaylistAction
  | SetNowPlayingSongAction
  | SetPlaylistsAction
  | SetModalVisibleAction
  | SetModalCurrentSongAction;
