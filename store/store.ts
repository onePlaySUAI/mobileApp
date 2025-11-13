import { createStore, combineReducers } from 'redux';
import { userReducer } from './userSlice';
import { songsReducer } from './songsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  song: songsReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
