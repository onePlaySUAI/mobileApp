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
