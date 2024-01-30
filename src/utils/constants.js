export const LoginBg =
  "https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9662d0fd-0547-4665-b887-771617268815/IN-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const POSTER_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const POSTER_CDN_URL_HD = "https://image.tmdb.org/t/p/w780/";

export const SUPPORTED_LANGUAGES = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hi",
    name: "Hindi",
  },
  {
    identifier: "es",
    name: "Spanish",
  },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

export const thinkingBunny =
  "https://media1.tenor.com/m/eomT2hRxUYIAAAAC/pooh-think.gif";

export const whenEmptyGptInput =
  "https://media1.tenor.com/m/szIcaP5lTNQAAAAd/kuch-na-kuch-likhna-to-padega-atmaram-tukaram-bhide.gif";

export const waitingForResponse =
  "https://media1.tenor.com/m/uI3y480lTIwAAAAd/dhamaal-vijay-raaz-atc-commentary-scene.gif";
