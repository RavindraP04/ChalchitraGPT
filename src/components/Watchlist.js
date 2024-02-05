import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  let movieIds = Object.keys(localStorageData).filter((key) => !isNaN(key));
  useEffect(() => {
    const data = localStorage;
    setLocalStorageData(data);
  }, []);

  return (
    <div className=" bg-black text-white">
      <div
        className={`flex h-screen ${
          movieIds.length === 0 ? "items-center justify-center" : ""
        } pt-24 px-14`}
      >
        {movieIds.length === 0 ? (
          <p className="text-3xl text-gray-600 font-bold">No Bookmark Yet!</p>
        ) : (
          movieIds.map((key) => (
            <MovieCard
              key={key}
              title="Watchlist"
              movieData={{ ...JSON.parse(localStorageData[key]) }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
