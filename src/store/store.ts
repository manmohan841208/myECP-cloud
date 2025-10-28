import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import { authApi } from './services/authApi';
import forgotPWDSecurityQuestionsReducer from '@/store/slices/forgotSecurityQuestionsSlice';
import resetPasswordReducer from '@/store/slices/resetPasswordSlice';
import forgotUserNameReducer from './slices/forgotUserNameSlice';
import sendOtpSliceReducer from './slices/sendOtpSlice';
import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  login: loginReducer,
  auth: authReducer,
  navigation: navReducer,
  securityQuestions: forgotPWDSecurityQuestionsReducer,
  resetPassword: resetPasswordReducer,
  forgotUserName: forgotUserNameReducer,
  sendOtpSlice: sendOtpSliceReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'securityQuestions', 'forgotUserName', '2FA'], // only persist this slice
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore redux-persist actions
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
