import { createSlice } from "@reduxjs/toolkit";
const storedDarkMode = localStorage.getItem("darkMode");
const initialState = {
  url: {},
  genres: {},
  isDarkMode: storedDarkMode !== null ? JSON.parse(storedDarkMode) : true,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfigration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfigration, getGenres, toggleDarkMode, setDarkMode } =
  homeSlice.actions;

export default homeSlice.reducer;
