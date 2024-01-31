// useMovieSearch.js
import { useState, useCallback } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addMovieSearchResult } from "../utils/gptSlice";

const useMovieSearch = (dispatch) => {
  const [loading, setLoading] = useState(false);

  const getMovieResultfromTMDM = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = useCallback(
    async (userInputValue) => {
      setLoading(true);

      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${userInputValue}. only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya and If for any reason you can't suggest movies then just reply "sorrybro"`;

      const responseList = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

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

      setLoading(false);
    },
    [dispatch]
  );

  return { handleGptSearch, loading };
};

export default useMovieSearch;
