// slices/resetPasswordSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ResetPasswordState {
  message: string;
}

const initialState: ResetPasswordState = {
  message: '',
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setResetPasswordMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearResetPasswordMessage: () => initialState,
  },
});

export const { setResetPasswordMessage, clearResetPasswordMessage } =
  resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
