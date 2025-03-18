import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './file-slice';
import hospitalReducer from './hospital-slice';

export const store = configureStore({
  reducer: {
    files: fileReducer,
    hospital: hospitalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
