import { useDispatch } from "react-redux";
import { addDetailedMovieData } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useDetailedMovieData = (id) => {
  const dispatch = useDispatch();
  const getMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dispatch(addDetailedMovieData(json));
  };

  useEffect(() => {
    getMovieDetails()
  }, [])
};

export default useDetailedMovieData;
