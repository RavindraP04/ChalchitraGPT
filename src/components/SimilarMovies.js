import { useSelector } from "react-redux";
import useSimilarMovies from "../Hooks/useSimilarMovies";
import MovieCard from "../components/MovieCard";

const SimilarMovies = ({ movie_id }) => {
  useSimilarMovies(movie_id);
  const similarMoviesArray = useSelector((store) => store.movies.similarMovies);

  return (
    <div className={`px-5 sm:px-12 ${(similarMoviesArray && similarMoviesArray.length === 0) ? "hidden" : "block"}`}>
      <h1 className="text-xl font-bold mb-5 mt-10">Similar Movies</h1>
      <div className="flex flex-row overflow-x-scroll custom-scrollbar">
        {similarMoviesArray && similarMoviesArray.map((movie) => (
          <MovieCard key={movie?.id} title={"similarMovies"} movieData={movie} />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
