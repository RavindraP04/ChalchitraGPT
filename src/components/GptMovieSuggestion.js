import { useDispatch, useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";
import { idk, thinkingBunny } from "../utils/constants";
import { changeGif } from "../utils/configSlice";
import { useEffect } from "react";
import MovieCard from "./MovieCard";

const GptMovieSuggestion = () => {
  const dispatch = useDispatch();
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  const gifImage = useSelector((store) => store.config.gifImage);

  useEffect(() => {
    dispatch(changeGif(thinkingBunny));
  }, []);

  if(gptMovieResult && tmdbMovieResult[0].length == 0){
    dispatch(changeGif(idk))
  }

  return (
    <div className="text-white flex justify-center items-center bg-black m-5 rounded-md sm:m-12 min-h-96 bg-opacity-80">
      {tmdbMovieResult ? (
        tmdbMovieResult.map((movie) => (
          <MovieCard key={movie[0].id} id={movie[0].id} movieData={movie[0]} title={"GptSearchResult"} poster={movie[0].poster_path} name={movie[0].title} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-96 gap-2 text-gray-400 brightness-105">
          <p>Ready for a cinematic adventure?</p>
          <p>What kind of movie are you in the mood for today?</p>
          <img className="h-52 mt-5 rounded-md" src={gifImage} />
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestion;
