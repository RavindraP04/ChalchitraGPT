import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

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
    !trailerVideo && getTrailerVideo();
  }, []);
  return <div>useTrailerVideo</div>;
};

export default useTrailerVideo;
