import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import lang from "../utils/languageConstants";

const GptMovieSuggestion = () => {
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  const currentLanguage = useSelector((store) => store.config.lang);
  const gifImage = useSelector((store) => store.config.gifImage);

  return (
    <div className="bg-black bg-opacity-80 relative my-5 rounded-md sm:my-12 py-5 sm:mx-20 min-h-96">
      {gptMovieResult && gptMovieResult[0][0] !== "sorrybro" ? (
        <div className="text-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 justify-items-center">
          {tmdbMovieResult.map((movie) => (
            <MovieCard
              key={movie[0].id}
              id={movie[0].id}
              movieData={movie[0]}
              title={"GptSearchResult"}
              poster={movie[0].poster_path}
              name={movie[0].title}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-96 gap-2 text-gray-400 brightness-105">
          <p className="text-center">{lang?.[currentLanguage]?.para1}</p>
          <p className="text-center">{lang?.[currentLanguage]?.para2}</p>
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
