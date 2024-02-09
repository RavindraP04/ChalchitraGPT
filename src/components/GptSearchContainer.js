import { useEffect, useState } from "react";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalClose } from "@mui/joy";

const GptSearchContainer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const modalShownBefore = localStorage.getItem("modalShown");

    if (!modalShownBefore) {
      setOpen(true);
    }
  }, []);

  return (
    <div>
      <GptSearchBar />
      <GptMovieSuggestion />
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="text-center rounded-xl bg-white text-black">
          <ModalClose />
          <div className="p-10 border-image-clip-path sm:w-[550px]">
            <h1 className="text-lg">
              Movie Recommendation <br /> Powered by{" "}
              <span className="font-bold text-purple-800">
                Gemini Pro & GPT 3.5
              </span>
            </h1>
            <p className="mt-5 text-justify">
              ✨Yo movie lover! Check out this crazy search bar! Forget
              scrolling through endless categories, just tell it what kinda
              flick you're in the mood for. Wanna mix things up with a sci-fi
              comedy heist? Or maybe a heart-wrenching drama with a touch of
              fantasy? No problem! This bad boy is powered by two AI champs,{" "}
              <span className="font-bold">Gemini Pro</span> and
              <span className="font-bold"> GPT-3.5 Turbo</span>, so it can read
              your mind (well, almost!). So spill the beans, what kind of movie
              magic are you craving?
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <input
                onClick={() => localStorage.setItem("modalShown", true)}
                className="w-4 h-4"
                type="checkbox"
                id="checkbox1"
              />
              <label for="checkbox1"> Don't Show this again!</label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GptSearchContainer;
