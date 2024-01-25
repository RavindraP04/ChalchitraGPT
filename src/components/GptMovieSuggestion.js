import { useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";

const GptMovieSuggestion = () => {
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  if (!gptMovieResult) return null;
  return (
    <div className="text-white bg-black m-5 rounded-md sm:m-12 min-h-96 bg-opacity-80">
      {gptMovieResult.map((movie, index) => (
        <MovieCategory
          css={index==0 ? (" pt-5 sm:pt-10 ") : (index==gptMovieResult.length-1 ? " pb-5 sm:pb-10 " : "")}
          key={movie}
          title={movie}
          data={tmdbMovieResult[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
