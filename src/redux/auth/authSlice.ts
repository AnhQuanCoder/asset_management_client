import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isAppLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAppLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: IUser }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    }
  },
})

export const { login, logout, setAppLoading } = authSlice.actions

export default authSlice.reducer