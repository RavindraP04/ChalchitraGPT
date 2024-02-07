import { useDispatch, useSelector } from "react-redux";
import { idk, thinkingBunny } from "../utils/constants";
import { changeGif } from "../utils/configSlice";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import lang from "../utils/languageConstants";

const GptMovieSuggestion = () => {
  const dispatch = useDispatch();
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  const currentLanguage = useSelector((store) => store.config.lang);
  const gifImage = useSelector((store) => store.config.gifImage);

  return (
    <div className="text-white flex justify-center items-center bg-black m-5 rounded-md sm:my-12 sm:mx-20 min-h-96 bg-opacity-80">
      {gptMovieResult && gptMovieResult[0][0] !== "sorrybro" ? (
        tmdbMovieResult.map((movie) => (
          <MovieCard
            key={movie[0].id}
            id={movie[0].id}
            movieData={movie[0]}
            title={"GptSearchResult"}
            poster={movie[0].poster_path}
            name={movie[0].title}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-96 gap-2 text-gray-400 brightness-105">
          <p>{lang?.[currentLanguage]?.para1}</p>
          <p>{lang?.[currentLanguage]?.para2}</p>
          <img
            alt="gif_Image"
            className="h-52 mt-5 rounded-md"
            src={gifImage}
          />
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestion;
