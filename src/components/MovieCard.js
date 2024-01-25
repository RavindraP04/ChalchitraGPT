import { POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, poster, name }) => {
  if (!poster) return null;
  return (
    <div className="w-24 sm:w-36 mr-4">
      <img
        className="rounded-lg hover:shadow-lg hover:shadow-slate-400"
        src={POSTER_CDN_URL + poster}
      />
      <div className="hidden sm:block">
        {title == "Now Playing" ? (
          ""
        ) : (
          <p className="line-clamp-2 max-h-11 sm:max-h-[51px] pb-5 text-xs sm:text-sm font-bold pt-2 pl-1 sm:pl-2">
            {name}
          </p>
        )}
      </div>
      <div className="block sm:hidden">
        <p className="line-clamp-2 max-h-11 sm:max-h-[51px] pb-5 text-xs sm:text-sm font-bold pt-2 pl-1 sm:pl-2">
          {name}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
