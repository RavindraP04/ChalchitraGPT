import MovieCard from "./MovieCard";

const MovieCategory = ({ title, data, css }) => {
  return (
    <div className={`${css} mx-5 sm:mx-14 mt-5 sm:mt-10`}>
      <h1 className="text-lg sm:text-xl pb-2 sm:pb-4 font-bold">{title}</h1>
      <div className="custom-scrollbar flex overflow-x-scroll">
        <div className="flex flex-row">
          {data?.map((movie) => (
            <MovieCard key={movie.id} title={title} poster={movie.poster_path} name={movie.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCategory;
