import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailerVideo = (movieId) => {
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
      ? dispatch(addTrailerVideo(trailerListFilter[0]))
      : dispatch(addTrailerVideo(json.results[0]));
  };
  useEffect(() => {
    getTrailerVideo();
  }, []);
  return <div>useTrailerVideo</div>;
};

export default useTrailerVideo;
