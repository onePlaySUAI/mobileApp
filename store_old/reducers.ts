// Action type constants
import { SongParams } from '../types/components';
const SET_USER = 'SET_USER';
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
const SET_ACTIVE_PLAYLIST = 'SET_ACTIVE_PLAYLIST';
const SET_NOW_PLAYING_SONG = 'SET_NOW_PLAYING_SONG';
const SET_PLAYLISTS = 'SET_PLAYLISTS';
const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
const SET_MODAL_CURRENT_SONG = 'SET_MODAL_CURRENT_SONG';
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const SET_PLAYLIST_MODAL_VISIBLE = 'SET_PLAYLIST_MODAL_VISIBLE';
const SET_PLAYLIST_MODAL_CURRENT = 'SET_PLAYLIST_MODAL_CURRENT';

// User state types
export interface UserState {
  name: string;
  email: string;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
  [key: string]: any;
}

export type UserAction = SetUserAction;

// Music state types
export interface MusicState {
  activeTab: 'search' | 'library';
  activePlaylistId: string | null;
  nowPlayingSong: {
    title: string;
    artist: string;
    albumCover?: string;
    isPlaying?: boolean;
    isFavorite?: boolean;
  } | null;
  playlists: {
    id: string;
    name: string;
    songs: {
      title: string;
      artist: string;
      source: 'Spotify' | 'Youtube' | 'Download';
      albumCover: string;
      active?: boolean;
      isFavorite?: boolean;
    }[];
  }[];
  modalVisible: boolean;
  modalCurrentSong: SongParams | null;
  playlistModalVisible: boolean;
  playlistModalCurrent: { id: string; name: string };
}

export interface SetActiveTabAction {
  type: typeof SET_ACTIVE_TAB;
  payload: 'search' | 'library';
  [key: string]: any;
}

export interface SetActivePlaylistAction {
  type: typeof SET_ACTIVE_PLAYLIST;
  payload: string | null;
  [key: string]: any;
}

export interface SetNowPlayingSongAction {
  type: typeof SET_NOW_PLAYING_SONG;
  payload: MusicState['nowPlayingSong'];
  [key: string]: any;
}

export interface SetPlaylistsAction {
  type: typeof SET_PLAYLISTS;
  payload: MusicState['playlists'];
  [key: string]: any;
}

export interface SetModalVisibleAction {
  type: typeof SET_MODAL_VISIBLE;
  payload: boolean;
  [key: string]: any;
}

export interface SetModalCurrentSongAction {
  type: typeof SET_MODAL_CURRENT_SONG;
  payload: SongParams;
  [key: string]: any;
}

export interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  [key: string]: any;
}

export interface SetPlaylistModalVisibleAction {
  type: typeof SET_PLAYLIST_MODAL_VISIBLE;
  payload: boolean;
  [key: string]: any;
}

export interface SetPlaylistModalCurrentAction {
  type: typeof SET_PLAYLIST_MODAL_CURRENT;
  payload: { id: string; name: string };
  [key: string]: any;
}

export type MusicAction =
  | SetActiveTabAction
  | SetActivePlaylistAction
  | SetNowPlayingSongAction
  | SetPlaylistsAction
  | SetModalVisibleAction
  | SetModalCurrentSongAction
  | ToggleFavoriteAction
  | SetPlaylistModalVisibleAction
  | SetPlaylistModalCurrentAction;

// Export constants for use in other files
export {
  SET_ACTIVE_TAB,
  SET_ACTIVE_PLAYLIST,
  SET_NOW_PLAYING_SONG,
  SET_PLAYLISTS,
  SET_MODAL_VISIBLE,
  SET_MODAL_CURRENT_SONG,
  SET_USER,
  TOGGLE_FAVORITE,
  SET_PLAYLIST_MODAL_VISIBLE,
  SET_PLAYLIST_MODAL_CURRENT,
};

const initialState: UserState = {
  name: '',
  email: '',
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setUser = (user: UserState): SetUserAction => ({
  type: SET_USER,
  payload: user,
});

// Music state

const initialMusicState: MusicState = {
  activeTab: 'search',
  activePlaylistId: null,
  nowPlayingSong: {
    title: 'I hate you',
    artist: 'Иван Иваныч',
    albumCover:
      'https://i.scdn.co/image/ab67616d00001e02a1edbe4e3f3e3fe296816af4',
    isPlaying: false,
    isFavorite: false,
  },
  playlists: [
    {
      id: '1',
      name: 'My Hits',
      songs: [
        {
          title:
            'quwytefghjgasfvxchgdjsdfiujhsdfilujhgsdiufhguiysdgfuytigvsafvdhgjf',
          artist: 'THE John',
          albumCover:
            'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
          source: 'Spotify',
          isFavorite: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Chill Vibes',
      songs: [],
    },
  ],
  modalVisible: false,
  modalCurrentSong: null,
  playlistModalVisible: false,
  playlistModalCurrent: { id: 'null', name: 'null' },
};

export const musicReducer = (
  state = initialMusicState,
  action: MusicAction
): MusicState => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case SET_ACTIVE_PLAYLIST:
      return { ...state, activePlaylistId: action.payload };
    case SET_NOW_PLAYING_SONG:
      return { ...state, nowPlayingSong: action.payload };
    case SET_PLAYLISTS:
      return { ...state, playlists: action.payload };
    case SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.payload };
    case SET_MODAL_CURRENT_SONG:
      return { ...state, modalCurrentSong: action.payload };
    case TOGGLE_FAVORITE:
      if (state.nowPlayingSong) {
        return {
          ...state,
          nowPlayingSong: {
            ...state.nowPlayingSong,
            isFavorite: !state.nowPlayingSong.isFavorite,
          },
        };
      }
      return state;
    case SET_PLAYLIST_MODAL_VISIBLE:
      return { ...state, playlistModalVisible: action.payload };
    case SET_PLAYLIST_MODAL_CURRENT:
      return { ...state, playlistModalCurrent: action.payload };
    default:
      return state;
  }
};

export const setActiveTab = (
  tab: 'search' | 'library'
): SetActiveTabAction => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const setActivePlaylist = (
  id: string | null
): SetActivePlaylistAction => ({
  type: SET_ACTIVE_PLAYLIST,
  payload: id,
});

export const setNowPlayingSong = (
  song: MusicState['nowPlayingSong']
): SetNowPlayingSongAction => ({
  type: SET_NOW_PLAYING_SONG,
  payload: song,
});

export const setPlaylists = (
  playlists: MusicState['playlists']
): SetPlaylistsAction => ({
  type: SET_PLAYLISTS,
  payload: playlists,
});

export const setModalVisible = (visible: boolean): SetModalVisibleAction => ({
  type: SET_MODAL_VISIBLE,
  payload: visible,
});

export const setModalCurrentSong = (song: SongParams): SetModalCurrentSongAction => ({
  type: SET_MODAL_CURRENT_SONG,
  payload: song,
});

export const toggleFavorite = (): ToggleFavoriteAction => ({
  type: TOGGLE_FAVORITE,
});

export const setPlaylistModalVisible = (
  visible: boolean
): SetPlaylistModalVisibleAction => ({
  type: SET_PLAYLIST_MODAL_VISIBLE,
  payload: visible,
});

export const setPlaylistModalCurrent = (playlist: {
  id: string;
  name: string;
}): SetPlaylistModalCurrentAction => ({
  type: SET_PLAYLIST_MODAL_CURRENT,
  payload: playlist,
});
