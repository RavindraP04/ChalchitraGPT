Developed & deployed AI-powered movie recommendation system: Implemented personalized suggestions using GPT-3.5 & Gemini Pro. Built a user-friendly UI with React.js, state management with Redux, and utilized Material UI components for seamless design. Deployed on Firebase for accessibility. 

# Chalchitra GPT

- 19th Jan 2024
    - Create React App
    - Configured TailwindCSS
    - Header
    - Routing of App
    - Login Form
    - Sign Up Form
    - Form validation
    - useRef Hook
    - Firebase Setup
    - deploying our app to production
- 20th Jan 2024
    - Create sign up user account
    - Implement Sign in user API
    - Created Redux Store with userSlice
    - BugFix: Sign up user displayName and profile picture update
    - BugFix: if user is not logged in then Redirect /browse to login page and vice-versa
    - unsubscribed to the onAuthStateChange Callback 
- 21st Jan 2024
    - Register TMDB API & create and app & get access token 
    - Get Data from TMDB now playing movies list API
    - custom hook to fetch Now Playing movies
    - created movieSlice
    - Planning for MainContainer and secondary container
    - fetch data for trailer video
    - updated store store with trailer video data
    - Embedded the youtube video trailer of movie and made it autoplay in loop
- 22nd Jan 2024
    - Build Secondary component
    - Build Movie List 
    - Build Movie card
    - TMDB Image CDN URL
    - Made the Browser page amazing with Tailwind CSS
    - added more custom hooks for popular, upcoming and top rated movies
- 23rd Jan 2024
    - GPT Search Page
    - GPT Search Bar
    - Multiligual Feature
    - Get Open AI Api Key
    - Gpt Search API Call
    - fetched gptMoviesSuggestions from TMDB
    - created gptSlice added data
    - Resused Movie List component to make movie suggestion container
    - Memoization to reduce unnecessary api call when already data is loaded in store
    - Added .env file
    - Adding .env file to gitignore
- 25th Jan 2023
    - Full website is not mobile responsive


# Features
- Login/Sign Up
    - Sign In/ SignUp Form
    - redirect to Browse Page
- Browse (after authentication)
    - Header
    - Main Movie
        - Trailer
        - Title & Description
        - Movie Suggestions
            -Movies List
- NetflixGPT
    - Search Bar
    - Movie Suggestions
