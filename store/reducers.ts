export interface UserState {
  name: string;
  email: string;
}

const SET_USER = 'SET_USER';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
}

export type UserAction = SetUserAction;

const initialState: UserState = {
  name: '',
  email: '',
  // token: ''; когда ручку будем делать
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
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

// === SONG REDUCER === //

export interface SongState {
  id: string;
  title: string;
  artist: string;
  albumCover?: string;
  audioUrl: string;
  isPlaying: boolean;
}

export interface SongReduxState {
  list: SongState[];
  current: SongState | null;
}

const initialSongState: SongReduxState = {
  list: [],
  current: null,
};

const SET_SONGS = "SET_SONGS";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";
const TOGGLE_CURRENT_SONG = "TOGGLE_CURRENT_SONG";

export const songReducer = (
  state = initialSongState,
  action: any
): SongReduxState => {
  switch (action.type) {
    case SET_SONGS:
      return { ...state, list: action.payload };

    case SET_CURRENT_SONG:
      return { ...state, current: action.payload };

    case TOGGLE_CURRENT_SONG:
      if (!state.current) return state;

      return {
        ...state,
        current: {
          ...state.current,
          isPlaying: !state.current.isPlaying,
        },
      };

    default:
      return state;
  }
};

// ACTION CREATORS
export const setSongs = (songs: SongState[]) => ({
  type: SET_SONGS,
  payload: songs,
});

export const setCurrentSong = (song: SongState) => ({
  type: SET_CURRENT_SONG,
  payload: song,
});

export const toggleCurrentSong = () => ({
  type: TOGGLE_CURRENT_SONG,
});
