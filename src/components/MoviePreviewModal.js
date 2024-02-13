import useDetailedMovieData from "../Hooks/useDetailedMovieData";
import { useSelector } from "react-redux";
import useTrailerModal from "../Hooks/useTrailerModal";
import "@fontsource/inter";
import useMovieCast from "../Hooks/useMovieCast";
import SimilarMovies from "./SimilarMovies";
import CastDetails from "./CastDetails";
import MoviePreviewModalHero from "./MoviePreviewModalHero";

const MoviePreviewModal = ({ movieData }) => {
  useTrailerModal(movieData?.id);
  useDetailedMovieData(movieData?.id);
  useMovieCast(movieData?.id);

  const castDetails = useSelector((store) => store.movies.castDetails);
  return (
    <>
      <div className="bg-black text-white rounded-md z-40 pb-20 fixed h-[95vh] w-[95vw] sm:w-[90vw] sm:h-[95vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto max-h-screen">
        <MoviePreviewModalHero movieData={movieData} />
        {castDetails && <CastDetails />}
        <SimilarMovies movie_id={movieData?.id} />
      </div>
    </>
  );
};

export default MoviePreviewModal;
