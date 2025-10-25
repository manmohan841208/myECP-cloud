// slices/forgotUserNameSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ForgotUserNameState {
  UserName: string;
}

const initialState: ForgotUserNameState = {
  UserName: '',
};

const forgotUserNameSlice = createSlice({
  name: 'forgotUserName',
  initialState,
  reducers: {
    setForgotUserName: (state, action: PayloadAction<string>) => {
      state.UserName = action.payload;
    },
    clearForgotUserName: () => initialState,
  },
});

export const { setForgotUserName, clearForgotUserName } =
  forgotUserNameSlice.actions;
export default forgotUserNameSlice.reducer;
