import { useSelector } from "react-redux";
import MovieCategory from "./MovieCategory";

const SecondaryContainer = () => {
  const movieData = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-[20%] text-white bg-gradient-to-t from-black relative z-20">
        <MovieCategory
          title={"Now Playing"}
          data={movieData.nowPlayingMovies}
        />
      </div>
      <div className="pt-10 text-white">
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
