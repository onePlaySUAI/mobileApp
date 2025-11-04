import { createStore, combineReducers } from 'redux';
import { userReducer, musicReducer } from './reducers';

const rootReducer = combineReducers({
  user: userReducer,
  music: musicReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
