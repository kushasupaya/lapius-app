import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './file-slice';

export const store = configureStore({
  reducer: {
    files: fileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
