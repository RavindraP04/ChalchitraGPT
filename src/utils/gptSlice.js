import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    toggleGptSearch: false,
    gptMovieResult: null,
    tmdbMovieResult: null,
  },
  reducers: {
    addToggleGptSearch: (state, action) => {
      state.toggleGptSearch = !state.toggleGptSearch;
    },
    addMovieSearchResult: (state, action) => {
      const { gptMovieResult, tmdbMovieResult } = action.payload;
      state.gptMovieResult = gptMovieResult;
      state.tmdbMovieResult = tmdbMovieResult;
    },
  },
});

export const { addToggleGptSearch, addMovieSearchResult } = gptSlice.actions;
export default gptSlice.reducer;
