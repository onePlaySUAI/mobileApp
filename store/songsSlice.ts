import { createStore, combineReducers } from 'redux';

// --- Types ---
export type SongSource = 'Spotify' | 'Youtube' | 'Download';

export interface SongItem {
  id: string; // optional but recommended for keys
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

// --- Action Types ---
const SET_SONG_LIST = 'songs/SET_SONG_LIST';
const SET_CURRENT_SONG = 'songs/SET_CURRENT_SONG';

// --- Actions ---
interface SetSongListAction {
  type: typeof SET_SONG_LIST;
  payload: SongItem[];
}

interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG;
  payload: SongItem;
}

export type SongsAction = SetSongListAction | SetCurrentSongAction;

export const setSongList = (songs: SongItem[]): SetSongListAction => ({
  type: SET_SONG_LIST,
  payload: songs,
});

export const setCurrentSong = (song: SongItem): SetCurrentSongAction => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

// --- Initial State ---
const initialState: SongsState = {
  list: [],
  current: null,
};

// --- Reducer ---
export const songsReducer = (
  state = initialState,
  action: SongsAction
): SongsState => {
  switch (action.type) {
    case SET_SONG_LIST:
      return { ...state, list: action.payload };
    case SET_CURRENT_SONG:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

// --- Example Store ---
const rootReducer = combineReducers({
  song: songsReducer,
  // add other reducers like user: userReducer
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
