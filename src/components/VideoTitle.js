const VideoTitle = ({ overview, title }) => {
  return (
    <div className="w-full aspect-video absolute sm:pt-[20%] pt-[30%] sm:pl-14 pl-5 bg-gradient-to-r from-[#0000006d] text-white">
      <h1 className="text-shadow select-none cursor-default sm:text-6xl text-xl font-bold">{title}</h1>
      <p className="select-none cursor-default w-[35%] hidden sm:block text-lg pt-5">{overview}</p>
      <div className="mt-2 sm:mt-5 flex flex-row gap-3">
        <button className=" bg-white flex flex-row p-1 sm:p-0 sm:px-8 sm:py-2 justify-center items-center gap-2 text-black text-xs font-bold sm:font-normal sm:text-lg rounded-md hover:bg-opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 sm:w-6 h-4 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          <span className="hidden sm:block">Play</span>
        </button>
        <button className="flex flex-row sm:px-6 p-1 sm:p-0 sm:py-2 justify-center items-center gap-2 bg-gray-500 text-white text-lg bg-opacity-50 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 sm:w-6 h-4 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          <span className="hidden sm:block">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
