import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlices";
export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
