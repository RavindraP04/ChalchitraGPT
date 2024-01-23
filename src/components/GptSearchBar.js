import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, LoginBg } from "../utils/constants";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { useRef } from "react";
import { addMovieSearchResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const userInput = useRef();
  const currentLanguage = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const getMovieResultfromTMDM = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      userInput.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const responseList = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!responseList.choices) {
      console.log("Let me think for a sec.");
    }

    const GptMovieResult =
      responseList.choices?.[0]?.message?.content.split(",");

    const finalMovieListPromise = GptMovieResult.map((movie) =>
      getMovieResultfromTMDM(movie)
    );
    const tmdbResults = await Promise.all(finalMovieListPromise);

    dispatch(
      addMovieSearchResult({
        gptMovieResult: GptMovieResult,
        tmdbMovieResult: tmdbResults,
      })
    );
  };

  return (
    <div>
      <div className="brightness-50 fixed -z-10 min-h-full min-w-full overflow-hidden">
        <img className="object-cover" src={LoginBg} alt="background_Image" />
      </div>
      <div className="pt-[10%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black w-1/2 grid grid-cols-12"
        >
          <input
            ref={userInput}
            className="p-4 m-4 outline-none col-span-9"
            type="text"
            placeholder={lang?.[currentLanguage]?.gptSearchPlaceholder}
          />
          <button
            onClick={handleGptSearch}
            className="flex flex-row justify-center items-center gap-2 col-span-3 m-4 py-2 px-4 bg-red-700  text-white rounded-lg"
          >
            {lang?.[currentLanguage]?.search}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
