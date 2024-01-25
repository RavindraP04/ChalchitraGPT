import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    dropdown: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.dropdown = !state.dropdown;
    },
  },
});

export const { changeLanguage, toggleDropdown } = configSlice.actions;
export default configSlice.reducer;
