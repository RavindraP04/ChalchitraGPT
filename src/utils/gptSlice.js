import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    toggleGptSearch: false,
    gptMovieResult: null,
    tmdbMovieResult: null,
    showGPTSearchExplanationModal: true,
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
    toggleGptSearchExplanationModal: (state, action) => {
      state.showGPTSearchExplanationModal = action.payload;
    },
  },
});

export const { addToggleGptSearch, addMovieSearchResult, toggleGptSearchExplanationModal } = gptSlice.actions;
export default gptSlice.reducer;
