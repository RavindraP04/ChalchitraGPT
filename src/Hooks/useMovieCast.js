import { useDispatch } from "react-redux";
import { addMovieCastDetails } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieCast = (movieId) => {
  const dispatch = useDispatch();

  const getCastDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.cast.filter(ele => ele.profile_path !== null);
    dispatch(addMovieCastDetails(filteredData));
  };

  useEffect(() => {
    getCastDetails();
  }, []);
};

export default useMovieCast;
