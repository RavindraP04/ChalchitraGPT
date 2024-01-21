import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Header";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <h1>Browse</h1>
      <h1>Browse</h1>
      <h1>Browse</h1>
      <h1>Browse</h1>
      <h1>Browse</h1>
    </div>
  );
};

export default Browse;
