import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filterReducer : filterSlice 
  },
});
