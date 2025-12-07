import { createStore, combineReducers } from 'redux';
import { userReducer } from './userSlice';
import { songsReducer } from './songsSlice';
import spotifyReducer from './spotifySlice';

const rootReducer = combineReducers({
  user: userReducer,
  song: songsReducer,
  spotify: spotifyReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
