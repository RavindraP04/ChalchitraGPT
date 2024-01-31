import { useDispatch, useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import GptSearchContainer from "./GptSearchContainer";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { toggleDropdown } from "../utils/configSlice";
import Loader from "./Loader";

const Browse = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const dispatch = useDispatch();
  const dropdown = useSelector((store) => store.config.dropdown);
  const dropdownClose = () => {
    if (dropdown) {
      dispatch(toggleDropdown());
    }
  };

  const gptToggle = useSelector((store) => store.gptSearch);

  return (
    <div>
      {!nowPlayingMovies && <Loader />}
      <Header />
      {gptToggle.toggleGptSearch ? (
        <div onClick={dropdownClose}>
          <GptSearchContainer />
        </div>
      ) : (
        <div onClick={dropdownClose}>
          <MainContainer />
          <SecondaryContainer />
        </div>
      )}
    </div>
  );
};

export default Browse;
