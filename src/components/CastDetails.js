import { useState } from "react";
import { useSelector } from "react-redux";
import { POSTER_CDN_URL } from "../utils/constants";

const CastDetails = () => {
  const [cast, setCast] = useState(6);
  const castDetails = useSelector((store) => store.movies.castDetails);
  const handleViewAllCast = () => {
    if (cast === castDetails.length - 1) {
      setCast(6);
    } else {
      setCast(castDetails.length - 1);
    }
  };
  return (
    <div>
      <h1 className="mb-5 font-bold relative flex items-center mx-5 sm:mx-11 mt-5 z-30">
        <span className="rounded-md text-xl sm:text-2xl">Cast</span>
      </h1>
      <div className="flex flex-row gap-4 custom-scrollbar overflow-x-scroll mx-5 sm:mx-11">
        {castDetails &&
          castDetails.map((person, index) => {
            if (person.profile_path && index < cast) {
              return (
                <div key={person.id} className="group">
                  <div className="w-28 sm:w-40 rounded-lg overflow-hidden">
                    <img
                      draggable={false}
                      className="rounded-lg group-hover:scale-105 group-hover:brightness-75 transition duration-200 ease-in-out"
                      src={POSTER_CDN_URL + person.profile_path}
                    />
                  </div>
                  <div className="py-1 -mt-10 sm:-mt-12 bg-opacity-30 w-28 sm:w-40 overflow-hidden bg-black/30 backdrop-blur-md rounded-b-md mb-5">
                    <p className="text-xs sm:text-sm truncate sm:h-auto text-center font-medium">
                      {person.original_name}
                    </p>
                    <p className="text-center text-xs sm:text-sm truncate text-shadow text-gray-300 h-5 overflow-hidden">
                      {person.character}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        {castDetails && castDetails.length > cast ? (
          <div
            onClick={handleViewAllCast}
            className="flex flex-col justify-end items-center mb-10 ml-2"
          >
            <div className="cursor-pointer group">
              {cast !== castDetails.length - 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-10 h-10 p-2 rounded-full bg-gray-500 bg-opacity-60 group-active:scale-95"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-10 h-10 p-2 rounded-full bg-gray-500 bg-opacity-60 group-active:scale-95"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              )}
              <p className="text-md whitespace-nowrap w-20">
                {cast == castDetails.length - 1 ? "View less" : "View all"}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CastDetails;
