const VideoTitle = ({ overview, title }) => {
  return (
    <div className="w-full aspect-video absolute pt-[20%] pl-14 bg-gradient-to-r from-black text-white">
      <h1 className="select-none cursor-default text-6xl font-bold">{title}</h1>
      <p className="select-none cursor-default w-[35%] text-lg pt-5">{overview}</p>
      <div className="mt-5 flex flex-row gap-3">
        <button className=" bg-white flex flex-row px-8 py-2 justify-center items-center gap-2 text-black text-lg rounded-md hover:bg-opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          Play
        </button>
        <button className="hidden md:flex flex-row px-6 py-2 justify-center items-center gap-2 bg-gray-500 text-white text-lg bg-opacity-50 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
