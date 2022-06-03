import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
};

export type AuthReducer = {
  login: (state: AuthState, action: { payload: { token: string } }) => void;
  reset: () => AuthState;
};

const initialState = {
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice<AuthState, AuthReducer, "auth">({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload: { token } }) {
      state.isLoggedIn = true;
      state.token = token;
    },
    reset() {
      return initialState;
    },
  },
});
