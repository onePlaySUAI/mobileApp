export interface UserState {
  name: string;
  email: string;
  // token: ''; когда ручку будем делать
}

const SET_USER = 'SET_USER';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
  [key: string]: any; // ✅ разрешаем дополнительные поля
}

export type UserAction = SetUserAction;

const initialState: UserState = {
  name: '',
  email: '',
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
