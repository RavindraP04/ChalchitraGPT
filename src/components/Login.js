import { useRef, useState } from "react";
import { LoginBg } from "../utils/constants";
import Header from "./Header";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isError, setIsError] = useState(null);

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleValidation = () => {
    const check = validate(email.current.value, password.current.value);
    setIsError(check);
    if (check) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/98400348?s=400&u=095cf205c3065609a9bef74f15fdb6cbde908254&v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setIsError(error);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          setIsError(errorCode);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          setIsError(errorCode);
        });
    }
  };

  const handleSignInSignUp = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative h-screen">
      <Header />
      <div className="brightness-50 absolute object-cover z-0 min-h-full min-w-full h-screen w-screen overflow-hidden">
        <img
          className="min-h-full min-w-full"
          src={LoginBg}
          alt="background_Image"
        />
      </div>
      {/* form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black bg-opacity-75 flex rounded-[4px] flex-col top-[25%] relative z-20 m-auto w-fit px-16 pt-10 pb-20 items-left text-white"
      >
        <h1 className="mb-8 text-3xl cursor-default">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="bg-[#333333] px-5 py-3 border-none rounded-[4px] outline-none w-72 mb-4"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="bg-[#333333] px-5 py-3 border-none rounded-[4px] outline-none w-72 mb-4"
          type="text"
          placeholder="Email or phone number"
        />
        <input
          ref={password}
          className="bg-[#333333] px-5 py-3 rounded-[4px] outline-none w-72 "
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500 my-3 h-6 text-sm text-center">{isError}</p>
        <button
          onClick={handleValidation}
          className="bg-red-600 contrast-125 rounded-[4px] w-72 py-3"
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <p className="mt-10">
          <span className="text-gray-400 cursor-default">
            {isSignInForm ? "New to Netflix?" : "Already Registered?"}
          </span>{" "}
          <span className="cursor-pointer" onClick={handleSignInSignUp}>
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
