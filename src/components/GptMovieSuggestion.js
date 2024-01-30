import { useDispatch, useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";
import { thinkingBunny } from "../utils/constants";
import { changeGif } from "../utils/configSlice";

const GptMovieSuggestion = () => {
  const dispatch = useDispatch();
  const { gptMovieResult, tmdbMovieResult } = useSelector(
    (store) => store.gptSearch
  );
  const gifImage = useSelector((store) => store.config.gifImage);

  if (!gptMovieResult) {
    dispatch(changeGif(thinkingBunny));
  }

  return (
    <div className="text-white bg-black m-5 rounded-md sm:m-12 min-h-96 bg-opacity-80">
      {gptMovieResult ? (
        gptMovieResult.map((movie, index) => (
          <MovieCategory
            css={
              index == 0
                ? " pt-5 sm:pt-10 "
                : index == gptMovieResult.length - 1
                ? " pb-5 sm:pb-10 "
                : ""
            }
            key={movie}
            title={movie}
            data={tmdbMovieResult[index]}
          />
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
