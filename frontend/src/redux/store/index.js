// 닉네임

import { configureStore } from '@reduxjs/toolkit';
import { nicknameReducer } from './reducers/nicknameReducer';

export const store = configureStore({
  reducer: {
    nickname: nicknameReducer,
  },
});
