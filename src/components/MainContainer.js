import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { POSTER_CDN_URL_HD } from "../utils/constants";

const MainContainer = () => {
  const TrailerVideo = useSelector((store) => store.movies?.nowPlayingMovies);
  const modalOpen = useSelector((store) => store.config.modalOpen);
  if (!TrailerVideo) return;
  const movie = TrailerVideo[0];
  const { overview, title, id, backdrop_path } = movie;

  return (
    <div className="relative bg-black pt-10 sm:pt-0 w-full aspect-video">
      <VideoTitle movie={movie} overview={overview} title={title} />
      {!modalOpen && (
        <VideoBackground movieId={id} type={"browsePageMainTrailer"} />
      )}
      {modalOpen && (
        <img
          draggable={false}
          className="h-full w-full object-cover object-top"
          src={POSTER_CDN_URL_HD + backdrop_path}
        />
      )}
    </div>
  );
};

export default MainContainer;
