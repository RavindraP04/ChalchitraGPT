import { useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";

const GptMovieSuggestion = () => {
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  if(!gptMovieResult) return null;
  return (
    <div className="text-white bg-black m-12 min-h-96 bg-opacity-80">
      {gptMovieResult.map((movie, index) => (
        <MovieCategory key={movie} title={movie} data={tmdbMovieResult[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
