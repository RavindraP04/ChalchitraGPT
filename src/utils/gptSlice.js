import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    toggleGptSearch: false,
  },
  reducers: {
    addToggleGptSearch: (state, action) => {
      state.toggleGptSearch = !state.toggleGptSearch;
    },
  },
});

export const { addToggleGptSearch } = gptSlice.actions;
export default gptSlice.reducer;
