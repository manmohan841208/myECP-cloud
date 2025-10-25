// redux/slices/loginSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  UserName: string;
  Password: string;
  rememberMe: boolean;
}

const initialState: LoginState = {
  UserName: '',
  Password: '',
  rememberMe: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.UserName = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.Password = action.payload;
    },
    setRememberMe(state, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
    resetLogin(state) {
      state.UserName = '';
      state.Password = '';
      state.rememberMe = false;
    },
  },
});

export const { setUserID, setPassword, setRememberMe, resetLogin } =
  loginSlice.actions;
export default loginSlice.reducer;
