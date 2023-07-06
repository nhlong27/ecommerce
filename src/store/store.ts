import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";

export const createStore = () => configureStore({
  reducer: {
    filterReducer : filterSlice 
  },
});

export const store = createStore();

