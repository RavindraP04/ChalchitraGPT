import { POSTER_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, poster, name }) => {
    if(!poster) return null
  return (
    <div className="w-36 mr-4">
      <img className="rounded-lg hover:shadow-lg hover:shadow-slate-400" src={POSTER_CDN_URL + poster} />
      {title=="Now Playing" ? "" : <p className="pb-5 text-sm font-bold pt-2 pl-2">{name}</p>}
    </div>
  );
};

export default MovieCard;
