import { useState, useCallback } from "react";
import openai from "../utils/openai";
import { API_OPTIONS, idk } from "../utils/constants";
import { addMovieSearchResult } from "../utils/gptSlice";
import genAI from "../utils/gemini";
import { changeGif } from "../utils/configSlice";

const useMovieSearch = (dispatch) => {
  const [loading, setLoading] = useState(false);
  const getMovieResultfromTMDM = async (movie, year) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&year=${year}`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = useCallback(
    async (userInputValue) => {
      setLoading(true);

      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${userInputValue}. Only give me names of 7 movies with its release year, comma separated like the example result given ahead. Example Result: Gadar-2002, Sholay-2003, Don-2004, Golmaal-2005, Koi Mil Gaya-2006, for any reason if you can't suggest movies then just reply "sorrybro"`;

      // let gptResponse = "";
      let geminiResponse = "";
      try {
        // const responseList = await openai.chat.completions.create({
        //   messages: [{ role: "user", content: gptQuery }],
        //   model: "gpt-3.5-turbo",
        // });

        // gptResponse = responseList.choices?.[0]?.message?.content;

        //GEMINI AI FETCHING START
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(gptQuery);
        const response = result.response;
        geminiResponse = response.text();
        console.log(geminiResponse);
        //GEMINI AI FETCHING END
      } catch (error) {
        console.log("Errrrr" + error);
        dispatch(changeGif(idk));
      }

      // let GptMovieResult = (geminiResponse + ", " + gptResponse).split(", ");
      let GptMovieResult = (geminiResponse).split(", ");
      let set = new Set(GptMovieResult);
      set.delete('')
      GptMovieResult = Array.from(set).map((ele) => (ele = ele.split("-")));

      let movieName = [];

      const finalMovieListPromise = GptMovieResult.map((movie) => {
        movieName.push(movie[0]); //movie[0] is the movie name and movie[1] is the year of release of the movie
        return getMovieResultfromTMDM(movie[0], movie[1]);
      });

      const tmdbResults = await Promise.all(finalMovieListPromise);

      const filteredTmdbResults = tmdbResults.map((ele, index) => {
        if (ele.length < 2) {
          return ele;
        } else {
          return (ele = ele.filter(
            (movie) => movie["title"] === movieName[index]
          ));
        }
      });

      const finalFilteredTmdbResults = filteredTmdbResults.filter(
        (ele) => ele.length !== 0
      );

      dispatch(
        addMovieSearchResult({
          gptMovieResult: GptMovieResult,
          tmdbMovieResult: finalFilteredTmdbResults,
        })
      );

      setLoading(false);
    },
    [dispatch]
  );

  return { handleGptSearch, loading };
};

export default useMovieSearch;
