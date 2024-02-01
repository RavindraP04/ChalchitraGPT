import { useDispatch, useSelector } from "react-redux";
import { modalOpen, toggleMute } from "../utils/configSlice";
import { Modal, ModalClose } from "@mui/joy";
import VideoBackground from "./VideoBackground";
import { useState } from "react";
import MoviePreviewModal from "./MoviePreviewModal";

const VideoTitle = ({ movie, overview, title }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const mute = useSelector((store) => store.config.mute);
  const handleMuteToggle = () => {
    dispatch(toggleMute());
  };
  const { id } = movie;

  const handleOpenTrailerModal = () => {
    setOpen(true);
    dispatch(modalOpen());
  };

  const handleCloseTrailerModal = () => {
    setOpen(false);
    dispatch(modalOpen());
  };

  const handleCloseModal = () => {
    dispatch(modalOpen())
    setShowModal(!showModal);
    document.body.style.overflowY = "scroll";
  };

  const handleOpenModal = () => {
    dispatch(modalOpen())
    setShowModal(!showModal);
    document.body.style.overflowY = "hidden";
  };

  return (
    <>
      {showModal && (
        <MoviePreviewModal
          movieData={movie}
          id={id}
          closeModal={handleCloseModal}
        />
      )}
      <div className="w-full aspect-video absolute sm:pt-[20%] pt-[30%] sm:pl-14 pl-5 bg-gradient-to-r from-[#000000ae] text-white">
        <h1
          className={`text-shadow select-none cursor-default sm:text-5xl text-xl font-bold`}
        >
          {title}
        </h1>
        <p className="select-none cursor-default w-[40%] hidden sm:block text-lg pt-5">
          {overview}
        </p>
        <div className="mt-2 sm:mt-5 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3">
            <button
              onClick={handleOpenTrailerModal}
              className=" bg-white flex flex-row p-1 sm:p-0 sm:px-8 sm:py-2 justify-center items-center gap-2 text-black text-xs font-bold sm:font-normal sm:text-lg rounded-md hover:bg-opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 sm:w-6 h-4 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              <span className="hidden sm:block">Play</span>
            </button>
            <button onClick={handleOpenModal} className="flex flex-row sm:px-6 p-1 sm:p-0 sm:py-2 justify-center items-center gap-2 bg-gray-500 text-white text-lg bg-opacity-50 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 sm:w-6 h-4 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <span className="hidden sm:block">More Info</span>
            </button>
          </div>
          <div className="bg-white/20 backdrop-blur-sm pl-2 pr-10 py-1">
            <div
              onClick={handleMuteToggle}
              className="cursor-pointer border rounded-full p-2"
            >
              {mute && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              )}
              {!mute && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <Modal
          className="flex items-center justify-center"
          open={open}
          onClose={handleCloseTrailerModal}
        >
          <div className="w-[80vw]">
            <ModalClose />
            <div>
              <VideoBackground movieId={id} type={"trailerModal"} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VideoTitle;
