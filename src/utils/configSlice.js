import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    dropdown: false,
    mute: true,
    modalOpen: false,
    gifImage: "",
    viewWatchListPage: false,
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
    changeToWatchlistPage: (state, action) => {
      state.viewWatchListPage = !state.viewWatchListPage;
    },
  },
});

export const {
  changeLanguage,
  toggleDropdown,
  toggleMute,
  modalOpen,
  changeGif,
  changeToWatchlistPage,
} = configSlice.actions;
export default configSlice.reducer;
