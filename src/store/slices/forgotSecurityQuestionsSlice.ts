// features/securityQuestions/securityQuestionsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ForgotPWDSecurityQuestionsState {
  Question1Id: number | null;
  Question1Text: string;
  Question2Id: number | null;
  Question2Text: string;
}

const initialState: ForgotPWDSecurityQuestionsState = {
  Question1Id: null,
  Question1Text: '',
  Question2Id: null,
  Question2Text: '',
};

const forgotPWDSecurityQuestionsSlice = createSlice({
  name: 'securityQuestions',
  initialState,
  reducers: {
    setForgotPWDSecurityQuestions: (
      state,
      action: PayloadAction<ForgotPWDSecurityQuestionsState>,
    ) => {
      return { ...state, ...action.payload };
    },
    resetForgotPWDSecurityQuestions: () => initialState,
  },
});

export const {
  setForgotPWDSecurityQuestions,
  resetForgotPWDSecurityQuestions,
} = forgotPWDSecurityQuestionsSlice.actions;
export default forgotPWDSecurityQuestionsSlice.reducer;
