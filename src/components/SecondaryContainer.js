import { useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";

const SecondaryContainer = () => {
  const movieData = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-3 sm:-mt-[20%] sm:pt-0 text-white bg-gradient-to-t from-black relative ">
        <MovieCategory
          title={"Now Playing"}
          data={movieData.nowPlayingMovies}
        />
      </div>
      <div className="sm:pt-10 pb-10 text-white">
        <MovieCategory
          title={"Popular"}
          data={movieData.popularMovies}
        />
        <MovieCategory
          title={"Top Rated"}
          data={movieData.topRatedMovies}
        />
        <MovieCategory
          title={"Upcoming"}
          data={movieData.upcomingMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
