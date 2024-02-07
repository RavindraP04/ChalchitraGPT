import { useDispatch, useSelector } from "react-redux";
import {
  LoginBg,
  idk,
  thinkingBunny,
  waitingForResponse,
  whenEmptyGptInput,
} from "../utils/constants";
import lang from "../utils/languageConstants";
import { useEffect, useRef } from "react";
import { changeGif } from "../utils/configSlice";
import useMovieSearch from "../Hooks/useMovieSearch";
import { addMovieSearchResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const userInput = useRef();
  const currentLanguage = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const { gptMovieResult } = useSelector((store) => store.gptSearch);

  const { handleGptSearch, loading } = useMovieSearch(dispatch);

  useEffect(() => {
    dispatch(changeGif(thinkingBunny));
  }, []);

  const onSearchClick = async () => {
    let gptInputField = document.getElementById("gptInputField").value;
    dispatch(
      addMovieSearchResult({
        gptMovieResult: null,
        tmdbMovieResult: null,
      })
    );

    if (gptInputField == "") {
      dispatch(changeGif(whenEmptyGptInput));
      return;
    }
    dispatch(changeGif(waitingForResponse));
    await handleGptSearch(userInput.current.value, dispatch);
  };

  let result = gptMovieResult !== null ? gptMovieResult[0][0] : "";
  if (
    result === "sorrybro" ||
    result === "i apologize" ||
    result === "sorry" ||
    result === "apologies"
  ) {
    dispatch(changeGif(idk));
  }

  return (
    <div>
      <div className="brightness-50 fixed -z-10 overflow-hidden">
        <img
          className="h-screen sm:w-screen object-cover"
          src={LoginBg}
          alt="background_Image"
        />
      </div>
      <div className="pt-[28%] sm:pt-[10%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-80 mx-5 relative sm:mx-0 rounded-md w-screen sm:w-1/2 grid grid-cols-12"
        >
          <input
            disabled={loading}
            ref={userInput}
            className="p-4 m-4 h-10 sm:h-auto pr-[50px] outline-none rounded-md col-span-12 sm:col-span-9"
            type="text"
            placeholder={lang?.[currentLanguage]?.gptSearchPlaceholder}
            id="gptInputField"
          />
          <button
            disabled={loading}
            onClick={onSearchClick}
            className="flex justify-center items-center absolute right-1 top-1 sm:right-auto sm:top-auto sm:relative col-span-0 sm:col-span-3 m-4 py-1 px-1 bg-red-700 text-white rounded-md"
          >
            <span className="flex flex-row items-center gap-2 flex-nowrap">
              <span className="hidden sm:block">
                {loading ? "Searching..." : lang?.[currentLanguage]?.search}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 hidden sm:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 block sm:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
