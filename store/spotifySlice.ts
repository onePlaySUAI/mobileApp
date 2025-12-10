import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

export interface StoredSpotify {
  sessionId: string | null;
  status: string | null;
  spotifyToken: string | null;
  spotifyRefresh: string | null;
}

const initialState: StoredSpotify = {
  sessionId: null,
  status: null,
  spotifyToken: SecureStore.getItem('spotify') ?? null,
  spotifyRefresh: null,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setSessionId(state: StoredSpotify, action: PayloadAction<string | null>) {
      state.sessionId = action.payload;
    },
    setStatus(state: StoredSpotify, action: PayloadAction<string | null>) {
      state.status = action.payload;
    },
    setSpotifyToken(state: StoredSpotify, action: PayloadAction<string | null>) {
      state.spotifyToken = action.payload;
    },
    setSpotifyRefresh(state: StoredSpotify, action: PayloadAction<string | null>) {
      state.spotifyRefresh = action.payload;
    },
    resetSpotify(state: StoredSpotify) {
      state.sessionId = null;
      state.status = null;
      state.spotifyToken = null;
      state.spotifyRefresh = null;
    },
  },
});

export const {
  setSessionId,
  setStatus,
  setSpotifyToken,
  setSpotifyRefresh,
  resetSpotify,
} = spotifySlice.actions;

export default spotifySlice.reducer;
