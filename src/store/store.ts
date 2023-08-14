import { configureStore } from '@reduxjs/toolkit';
import accountSectionSlice from './slices/accountSectionSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      accountSectionReducer: accountSectionSlice,
    },
  });

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
