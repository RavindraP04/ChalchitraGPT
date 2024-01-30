import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    dropdown: false,
    mute: true,
    modalOpen: false,
    gifImage: "",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.dropdown = !state.dropdown;
    },
    toggleMute: (state, action) => {
      state.mute = !state.mute;
    },
    modalOpen: (state, action) => {
      state.modalOpen = !state.modalOpen;
    },
    changeGif: (state, action) => {
      state.gifImage = action.payload;
    },
  },
});

export const { changeLanguage, toggleDropdown, toggleMute, modalOpen, changeGif } =
  configSlice.actions;
export default configSlice.reducer;
