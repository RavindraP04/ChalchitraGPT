import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    trailerModal: null,
    detailedMovieData: null,
    castDetails: null,
    similarMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTrailerModal: (state, action) => {
      state.trailerModal = action.payload;
    },
    addDetailedMovieData: (state, action) => {
      state.detailedMovieData = action.payload;
    },
    addMovieCastDetails: (state, action) => {
      state.castDetails = action.payload;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addDetailedMovieData,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrailerModal,
  addMovieCastDetails,
  addSimilarMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
