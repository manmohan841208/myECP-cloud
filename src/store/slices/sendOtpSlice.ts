// store/slices/otpSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
  selectedOption: 'Email' | 'SMS' | '';
  otpResponse: string;
}

const initialState: OtpState = {
  selectedOption: '',
  otpResponse: '',
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<'Email' | 'SMS' | ''>) => {
      state.selectedOption = action.payload;
    },
    setOtpResponse: (state, action: PayloadAction<string>) => {
      state.otpResponse = action.payload;
    },
    resetSelectedOption: (state) => {
      state.selectedOption = '';
    },
  },
});

export const { setSelectedOption, resetSelectedOption, setOtpResponse } =
  otpSlice.actions;
export default otpSlice.reducer;
