import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../utils/configSlice";

const Watchlist = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const [watchListData, setWatchListData] = useState(false);
  let movieIds = Object.keys(localStorageData).filter((key) => !isNaN(key));
  
  const handleState = () => {
    setWatchListData(!watchListData);
  };

  useEffect(() => {
    const data = localStorage;
    setLocalStorageData(data);
  }, []);

  return (
    <div className=" bg-black pt-24 px-14 text-white h-screen">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 ${
          movieIds.length === 0 ? "items-center justify-center" : ""
        }`}
      >
        {movieIds.length === 0 ? (
          <p className="text-3xl text-gray-600 font-bold">No Bookmark Yet!</p>
        ) : (
          movieIds.map((key) => (
            <div
              key={key}
              className="flex items-center justify-center h-fit w-full"
              onClick={handleState}
            >
              <MovieCard
                title="Watchlist"
                movieData={{ ...JSON.parse(localStorageData[key]) }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
