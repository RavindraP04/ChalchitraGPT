import { useState } from "react";
import { POSTER_CDN_URL } from "../utils/constants";
import MoviePreviewModal from "./MoviePreviewModal";
import { useDispatch } from "react-redux";
import { modalOpen } from "../utils/configSlice";

const MovieCard = ({ id, title, poster, name, movieData }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

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

  if (!poster) return null;
  return (
    <div>
      {showModal && (
        <MoviePreviewModal
          movieData={movieData}
          id={id}
          closeModal={handleCloseModal}
        />
      )}
      <div onClick={handleOpenModal} className="w-24 cursor-pointer pb-3 sm:w-36 mr-4">
        <div className="relative group hover:shadow-lg hover:shadow-white/40 rounded-lg overflow-hidden">
          <img
            draggable={false}
            className="rounded-lg group-hover:brightness-75 group-hover:scale-105 transition duration-300 ease-in-out"
            src={POSTER_CDN_URL + poster}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 hidden group-hover:block shadow-lg shadow-black/50 rounded-md absolute right-1 bottom-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
        {title == "Now Playing" ? (
          ""
        ) : (
          <p className="line-clamp-2 max-h-10 sm:max-h-[50px] pb-5 text-xs sm:text-sm font-bold pt-2 pl-1 sm:pl-2">
            {name}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
