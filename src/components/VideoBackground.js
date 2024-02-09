import { useSelector } from "react-redux";
import useTrailerVideo from "../Hooks/useTrailerVideo";
import useTrailerModal from "../Hooks/useTrailerModal";

const VideoBackground = ({ movieId, type }) => {
  useTrailerVideo(movieId);
  useTrailerModal(movieId);
  const mute = useSelector((store) => store.config.mute);

  const videoTrailer = useSelector((store) => store.movies?.trailerVideo);
  const videoModal = useSelector((store) => store.movies?.trailerModal);
  let videoKey = null;
  if (type == "trailerModal") {
    videoKey = videoModal;
  } else if ((type = "browsePageMainTrailer")) {
    videoKey = videoTrailer;
  }

  return (
    <div className="">
      <iframe
        className="w-full border-none aspect-video"
        src={
          `https://www.youtube.com/embed/` +
          videoKey?.key +
          `?rel=0?version=3&autoplay=1` + (mute ? "&mute=1" : "") + (type == "trailerModal" ? "&controls=1" : "&controls=0") + `&showinfo=0&loop=1&playlist=` +
          videoKey?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
