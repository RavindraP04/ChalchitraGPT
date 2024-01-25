import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const TrailerVideo = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!TrailerVideo) return;
  const movie = TrailerVideo[0];
  const { overview, title, id } = movie;

  return (
    <div className="relative bg-black pt-10 sm:pt-0 w-full aspect-video">
      <VideoTitle overview={overview} title={title} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
