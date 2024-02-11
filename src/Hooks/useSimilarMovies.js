import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSimilarMovies } from "../utils/moviesSlice";

const useSimilarMovies = (movie_id) => {
  const dispatch = useDispatch();
  const getSimilarMovies = async (movie_id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addSimilarMovies(json?.results));
  };

  useEffect(() => {
    getSimilarMovies(movie_id);
  }, []);
};

export default useSimilarMovies;
