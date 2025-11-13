import { AnyAction } from 'redux';

export type SongSource = 'Spotify' | 'Youtube' | 'Download';

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  source: SongSource;
}

export interface SongsState {
  list: SongItem[];
  current: SongItem | null;
}

const SET_SONG_LIST = 'songs/SET_SONG_LIST';
const SET_CURRENT_SONG = 'songs/SET_CURRENT_SONG';
const ADD_SONG = 'songs/ADD_SONG';

interface SetSongListAction {
  type: typeof SET_SONG_LIST;
  payload: SongItem[];
}

interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG;
  payload: SongItem;
}

interface AddSongAction {
  type: typeof ADD_SONG;
  payload: SongItem;
}

export type SongsAction = SetSongListAction | SetCurrentSongAction | AddSongAction | AnyAction;

export const setSongList = (songs: SongItem[]): SetSongListAction => ({
  type: SET_SONG_LIST,
  payload: songs,
});

export const setCurrentSong = (song: SongItem): SetCurrentSongAction => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const addSong = (song: SongItem): AddSongAction => ({
  type: ADD_SONG,
  payload: song,
});

const initialState: SongsState = {
  list: [],
  current: null,
};

export const songsReducer = (
  state = initialState,
  action: SongsAction
): SongsState => {
  switch (action.type) {
    case SET_SONG_LIST:
      return { ...state, list: action.payload };
    case SET_CURRENT_SONG:
      return { ...state, current: action.payload };
    case ADD_SONG:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }
};