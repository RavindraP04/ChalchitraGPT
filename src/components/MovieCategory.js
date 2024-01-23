import MovieCard from "./MovieCard";

const MovieCategory = ({ title, data }) => {
  return (
    <div className="mx-14 mt-10 ">
      <h1 className="text-xl pb-4 font-bold">{title}</h1>
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
