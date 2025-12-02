import { AnyAction } from 'redux';

export type SongSource = 'Spotify' | 'Youtube' | 'Download';

export interface SongType {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  source: SongSource;
}

/**
 * State now stores the ordered list and the index of the current song (queue behavior).
 * currentIndex = null means nothing is selected / queue is empty.
 */
export interface SongsState {
  list: SongType[];
  currentIndex: number | null;
}

/* Action types */
const SET_SONG_LIST = 'songs/SET_SONG_LIST';
const SET_CURRENT_SONG = 'songs/SET_CURRENT_SONG';
const ADD_SONG = 'songs/ADD_SONG';
const NEXT_SONG = 'songs/NEXT_SONG';
const PREV_SONG = 'songs/PREV_SONG';

interface SetSongListAction {
  type: typeof SET_SONG_LIST;
  payload: SongType[];
}

interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG;
  payload: SongType; // reducer will find index of this song in list
}

interface AddSongAction {
  type: typeof ADD_SONG;
  payload: SongType;
}

interface NextSongAction {
  type: typeof NEXT_SONG;
}

interface PrevSongAction {
  type: typeof PREV_SONG;
}

export type SongsAction =
  | SetSongListAction
  | SetCurrentSongAction
  | AddSongAction
  | NextSongAction
  | PrevSongAction
  | AnyAction;

/* Action creators */
export const setSongList = (songs: SongType[]): SetSongListAction => ({
  type: SET_SONG_LIST,
  payload: songs,
});

export const setCurrentSong = (song: SongType): SetCurrentSongAction => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const addSong = (song: SongType): AddSongAction => ({
  type: ADD_SONG,
  payload: song,
});

export const nextSong = (): NextSongAction => ({ type: NEXT_SONG });
export const prevSong = (): PrevSongAction => ({ type: PREV_SONG });

/* Initial state */
const initialState: SongsState = {
  list: [],
  currentIndex: null,
};

/* Helper to clamp/wrap index */
const wrapIndex = (index: number, length: number): number => {
  if (length === 0) return -1;
  return ((index % length) + length) % length;
};

/* Reducer implementing queue-like behavior and next/prev navigation */
export const songsReducer = (
  state = initialState,
  action: SongsAction
): SongsState => {
  switch (action.type) {
    case SET_SONG_LIST: {
      const list = action.payload.slice(); // copy
      const currentIndex =
        list.length === 0 ? null : (state.currentIndex !== null ? wrapIndex(state.currentIndex, list.length) : 0);
      return { ...state, list, currentIndex };
    }

    case SET_CURRENT_SONG: {
      const idx = state.list.findIndex((s) => s.id === action.payload.id);
      return { ...state, currentIndex: idx === -1 ? state.currentIndex : idx };
    }

    case ADD_SONG: {
      const newList = [...state.list, action.payload];
      // If queue was empty, start playing the first added song (index 0)
      const currentIndex = state.currentIndex === null ? 0 : state.currentIndex;
      return { ...state, list: newList, currentIndex };
    }

    case NEXT_SONG: {
      if (state.list.length === 0) return state;
      const nextIndex =
        state.currentIndex === null ? 0 : wrapIndex(state.currentIndex + 1, state.list.length);
      return { ...state, currentIndex: nextIndex };
    }

    case PREV_SONG: {
      if (state.list.length === 0) return state;
      const prevIndex =
        state.currentIndex === null ? 0 : wrapIndex(state.currentIndex - 1, state.list.length);
      return { ...state, currentIndex: prevIndex };
    }

    default:
      return state;
  }
};

/* Selectors */

/**
 * Returns the current SongType or null if none selected.
 */
export const selectCurrentSong = (state: SongsState): SongType | null => {
  if (state.currentIndex === null) return null;
  return state.list[state.currentIndex] ?? null;
};

/**
 * Returns the ordered queue of songs.
 */
export const selectSongList = (state: SongsState): SongType[] => state.list;

/**
 * Returns the current index in the queue (or null).
 */
export const selectCurrentIndex = (state: SongsState): number | null => state.currentIndex;
