import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerModal } from "../utils/moviesSlice";

const useTrailerModal = (movieId) => {
  const dispatch = useDispatch();

  const getTrailerVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const trailerListFilter = json.results.filter(
      (ele) => ele.type === "Trailer"
    );
    trailerListFilter.length !== 0
      ? dispatch(addTrailerModal(trailerListFilter[0]))
      : dispatch(addTrailerModal(json.results[0]));
  };
  useEffect(() => {
    getTrailerVideo();
  }, []);
};

export default useTrailerModal;
