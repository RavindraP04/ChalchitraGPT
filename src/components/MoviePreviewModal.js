import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { POSTER_CDN_URL, POSTER_CDN_URL_HD } from "../utils/constants";
import useDetailedMovieData from "../Hooks/useDetailedMovieData";
import { useDispatch, useSelector } from "react-redux";
import { addDetailedMovieData } from "../utils/moviesSlice";
import useTrailerModal from "../Hooks/useTrailerModal";
import VideoBackground from "./VideoBackground";
import "@fontsource/inter";
import Modal from "@mui/joy/Modal";
import { ModalClose, Tooltip } from "@mui/joy";
import useMovieCast from "../Hooks/useMovieCast";
import Snackbar from "@mui/joy/Snackbar";
import { modalOpen } from "../utils/configSlice";

const MoviePreviewModal = ({ closeModal, movieData }) => {
  const [open, setOpen] = useState(false);
  const [cast, setCast] = useState(6);
  const [openToast, setOpenToast] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(null);
  useTrailerModal(movieData?.id);
  useDetailedMovieData(movieData?.id);
  useMovieCast(movieData?.id);
  const viewWatchListPage = useSelector(
    (store) => store.config.viewWatchListPage
  );

  const castDetails = useSelector((store) => store.movies.castDetails);

  const modalRoot = document.getElementById("modal-root");
  const modalRefFg = useRef(null);
  const modalRefBg = useRef(null);

  const getMovieDetails = useSelector(
    (store) => store?.movies?.detailedMovieData
  );
  const dispatch = useDispatch();

  const genres = getMovieDetails?.genres.map((ele) => ele.name);

  useEffect(() => {
    modalRefFg.current.classList.add("blur-transition-Modal-foreground");
    modalRefBg.current.classList.add("blur-transition-Modal-background");

    if (localStorage.getItem(movieData?.id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }

    return () => {
      dispatch(addDetailedMovieData(null));
    };
  }, [dispatch, modalRefFg, modalRefBg, movieData?.id]);

  const handleViewAllCast = () => {
    if (cast === castDetails.length - 1) {
      setCast(6);
    } else {
      setCast(castDetails.length - 1);
    }
  };

  const handleWatchList = () => {
    if (isBookmarked) {
      localStorage.removeItem(movieData?.id);
    } else {
      localStorage.setItem(movieData?.id, JSON.stringify(movieData));
    }
    setIsBookmarked(!isBookmarked);
    setOpenToast(true);
    if (viewWatchListPage) {
      dispatch(modalOpen());
    }
  };

  return createPortal(
    <>
      <div
        ref={modalRefBg}
        onClick={closeModal}
        className="fixed z-30 top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-white/20"
      >
        <button className="absolute z-30 hidden sm:block top-2 right-2 font-bold hover:bg-white hover:text-black text-white rounded-md p-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        ref={modalRefFg}
        className="bg-black text-white rounded-md z-40 pb-20 fixed h-[95vh] w-[95vw] sm:w-[90vw] sm:h-[95vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto max-h-screen"
      >
        <div className="relative h-screen sm:h-[510px]">
          <div className="relative brightness-50 -z-10 overflow-hidden h-screen sm:h-[510px]">
            <img
              alt="Backdrop_image"
              draggable={false}
              className="h-full w-full object-cover object-top"
              src={POSTER_CDN_URL_HD + movieData?.backdrop_path}
            />
          </div>
          <div className="bg-black/40 absolute top-0 z-10 h-full w-full"></div>
          <div className="absolute top-10 flex flex-col items-center justify-center sm:grid sm:grid-cols-12 w-full h-fit z-20">
            <div className="sm:col-span-3 relative sm:left-5 sm:justify-self-end">
              <img
                alt="Poster_image"
                className="w-40 sm:w-72 rounded-md"
                src={POSTER_CDN_URL_HD + movieData?.poster_path}
              />
            </div>
            <div className="sm:col-span-9 pt-2 sm:pt-6 w-full sm:w-fit px-5 sm:px-0 sm:mx-14 h-fit text-center sm:text-left">
              <div className="flex flex-col gap-1">
                <h1 className="select-none w-full cursor-default sm:text-4xl text-xl font-bold">
                  <span className="text-shadow ">{movieData?.title}</span>{" "}
                  <span className="font-normal txt-xl sm:text-2xl text-gray-300">
                    ({movieData?.release_date.split("-")[0]})
                  </span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center sm:items-start justify-center sm:justify-start">
                  <p>
                    <span className="sm:hidden">Release date : </span>{" "}
                    {movieData?.release_date.split("-").reverse().join("/")}
                  </p>
                  <span className="hidden sm:block">•</span>
                  <p>{genres ? genres.join(", ") : ""}</p>
                </div>
              </div>

              <div className="flex w-full flex-row items-center justify-center sm:justify-start gap-5 mt-2 sm:mt-5">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 fill-yellow-500 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p>
                    <span className="font-bold text-lg">
                      {movieData?.vote_average.toFixed(1)}
                    </span>
                    /10
                  </p>
                </div>

                <Tooltip
                  title={`${
                    isBookmarked ? "Added to Watchlist" : "Add to Watchlist"
                  }`}
                  size="sm"
                >
                  <div
                    onClick={handleWatchList}
                    className="p-2 active:scale-95 bg-white/30 backdrop-blur-sm cursor-pointer rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 ${
                        isBookmarked
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "fill-white"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </div>
                </Tooltip>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={openToast}
                  autoHideDuration={3000}
                  color={isBookmarked ? "success" : "danger"}
                  size="md"
                  variant="plain"
                  onClose={(event, reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    setOpenToast(false);
                  }}
                >
                  {isBookmarked
                    ? `${movieData.title} added to watchlist.`
                    : `${movieData.title} removed from watchlist.`}
                </Snackbar>
              </div>

              <div>
                <h3 className="pt-5 text-white text-xl font-semibold">
                  Overview
                </h3>
                <p className="select-none cursor-default text-sm text-balance sm:text-left sm:text-base pt-1">
                  {movieData?.overview}
                </p>
              </div>

              <div className="mt-2 sm:mt-5 flex flex-row justify-center sm:justify-start gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className=" bg-white flex flex-row px-8 py-2 justify-center items-center gap-2 text-black text-sm mt-2 sm:mt-0 font-bold sm:font-normal sm:text-lg rounded-md hover:bg-opacity-80"
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
                  <span>Play Trailer</span>
                </button>
              </div>
            </div>
          </div>
          <Modal
            className="flex items-center justify-center"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className="w-screen sm:w-[80vw]">
              <ModalClose />
              <div>
                <VideoBackground
                  movieId={movieData?.id}
                  type={"trailerModal"}
                />
              </div>
            </div>
          </Modal>
        </div>
        {castDetails && (
          <div>
            <h1 className="mb-5 font-bold relative flex items-center mx-5 sm:mx-11 mt-5 z-30">
              <span className="rounded-md text-xl sm:text-2xl">Cast</span>
            </h1>
            <div className="flex flex-row gap-4 custom-scrollbar overflow-x-scroll mx-5 sm:mx-11">
              {castDetails &&
                castDetails.map((person, index) => {
                  if (person.profile_path && index < cast) {
                    return (
                      <div key={person.id} className="group">
                        <div className="w-28 sm:w-40 rounded-lg overflow-hidden">
                          <img
                            draggable={false}
                            className="rounded-lg group-hover:scale-105 group-hover:brightness-75 transition duration-200 ease-in-out"
                            src={POSTER_CDN_URL + person.profile_path}
                          />
                        </div>
                        <div className="py-1 -mt-10 sm:-mt-12 bg-opacity-30 w-28 sm:w-40 overflow-hidden bg-black/30 backdrop-blur-md rounded-b-md mb-5">
                          <p className="text-xs sm:text-sm truncate sm:h-auto text-center font-medium">
                            {person.original_name}
                          </p>
                          <p className="text-center text-xs sm:text-sm truncate text-shadow text-gray-300 h-5 overflow-hidden">
                            {person.character}
                          </p>
                        </div>
                      </div>
                    );
                  }
                })}
              {castDetails && castDetails.length > cast ? (
                <div
                  onClick={handleViewAllCast}
                  className="flex flex-col justify-end items-center mb-10 ml-2"
                >
                  <div className="cursor-pointer group">
                    {cast !== castDetails.length - 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-10 h-10 p-2 rounded-full bg-gray-500 bg-opacity-60 group-active:scale-95"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-10 h-10 p-2 rounded-full bg-gray-500 bg-opacity-60 group-active:scale-95"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    )}
                    <p className="text-md whitespace-nowrap w-20">
                      {cast == castDetails.length - 1
                        ? "View less"
                        : "View all"}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={closeModal}
        className="fixed z-40 flex justify-center py-2 bottom-0 sm:hidden font-bold text-white text-shadow border border-gray-600 backdrop-blur-sm bg-black bg-opacity-80 rounded-t-md w-screen text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>,
    modalRoot
  );
};

export default MoviePreviewModal;
