import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { addToggleGptSearch } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import logo from "../assets/Designer.jpg";
import {
  changeLanguage,
  changeToWatchlistPage,
  toggleDropdown,
} from "../utils/configSlice";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((store) => store.user);
  const toggleGptSearch = useSelector(
    (store) => store.gptSearch.toggleGptSearch
  );
  const dropdown = useSelector((store) => store.config.dropdown);
  const showWatchListPage = useSelector(
    (store) => store.config.viewWatchListPage
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleGptSearch = () => {
    if (showWatchListPage) {
      dispatch(changeToWatchlistPage());
    }
    dispatch(addToggleGptSearch());
  };

  const closeGPTandWatchlist = () => {
    dispatch(changeToWatchlistPage());
  };

  const handleWatchlist = () => {
    if (toggleGptSearch) {
      dispatch(addToggleGptSearch());
    }
    dispatch(changeToWatchlistPage());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleScroll = () => {
    const scrolled = window.scrollY > 100;
    setIsScrolled(scrolled);
  };

  const handleDropdown = () => {
    dispatch(toggleDropdown());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black"
      } w-full fixed top-0 z-30 py-4 sm:px-12 px-4`}
    >
      <div>
        <img
          className={`svg-icon svg-icon-netflix-logo fill-red-600 sm:mt-1 mt-2 sm:mx-0 brightness-105 contrast-125 w-32 sm:w-40`}
          src={logo}
        />
      </div>

      {user && (
        <div className="flex flex-row items-center gap-3">
          {/* Langauge Selector */}
          {toggleGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="outline-none p-2 bg-gray-900 text-white m-2"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {showWatchListPage && (
            <button
              onClick={closeGPTandWatchlist}
              className="py-2 hidden sm:flex px-4 gap-2 text-sm font-bold bg-transparent text-white rounded-md active:scale-95"
            >
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home Page
            </button>
          )}

          {/* HomePage / GPT Search Navbar Toggle */}
          {!dropdown && (
            <button
              onClick={handleToggleGptSearch}
              className="py-2 hidden sm:flex px-4 gap-2 text-sm font-bold bg-purple-800 text-white rounded-md active:scale-95"
            >
              {toggleGptSearch ? (
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              ) : (
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              )}
              {toggleGptSearch ? "Home Page" : "GPT Search"}
            </button>
          )}

          <div onClick={handleDropdown} className="relative">
            {/* User Photo onClick toggle */}
            <div className="flex text-white cursor-pointer items-center gap-1">
              <img
                draggable={false}
                className="w-9 rounded-lg"
                alt="userPhoto"
                src={user?.photoURL}
              />
              {dropdown ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </div>

            {dropdown && (
              <div className="absolute top-10 right-0 flex flex-col rounded-md bg-white border border-black p-1 gap-1">
                {/* HomePage / GPT Search inside dropdown */}
                <button
                  onClick={handleToggleGptSearch}
                  className="py-2 flex whitespace-nowrap justify-start items-center gap-2 px-4 text-sm font-bold bg-purple-800 text-white rounded-md active:scale-95"
                >
                  {toggleGptSearch ? (
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
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  ) : (
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  )}
                  {toggleGptSearch ? "Home Page" : "GPT Search"}
                </button>

                {/* WatchList and HomePage toggle inside the dropdown */}
                <button
                  className="py-2 flex whitespace-nowrap justify-start items-center gap-2 px-4 text-sm font-bold bg-black text-white rounded-md active:scale-95"
                  onClick={
                    showWatchListPage ? closeGPTandWatchlist : handleWatchlist
                  }
                >
                  {showWatchListPage ? (
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
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  ) : (
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
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  )}
                  {showWatchListPage ? "Home Page" : "Watchlist"}
                </button>

                {/* Login / Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="border border-black whitespace-nowrap text-sm font-extrabold rounded-md bg-white flex justify-start px-4 items-center gap-3 py-2 text-black"
                >
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
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
