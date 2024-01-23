import { useSelector } from "react-redux";
import { LoginBg } from "../utils/constants";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const currentLanguage = useSelector((store) => store.config.lang);

  return (
    <div>
      <div className="brightness-50 absolute -z-10 object-cover min-h-full min-w-full h-screen w-screen overflow-hidden">
        <img
          className="min-h-full min-w-full"
          src={LoginBg}
          alt="background_Image"
        />
      </div>
      <div className="pt-[10%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black w-1/2 grid grid-cols-12"
        >
          <input
            className="p-4 m-4 outline-none col-span-9"
            type="text"
            placeholder={lang?.[currentLanguage]?.gptSearchPlaceholder}
          />
          <button className="flex flex-row justify-center items-center gap-2 col-span-3 m-4 py-2 px-4 bg-red-700  text-white rounded-lg">
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
