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
    <div className="relative flex justify-center items-center h-screen">
      <Header />
      <div className="brightness-50 fixed -z-10 overflow-hidden">
        <img
          className="h-screen sm:w-screen object-cover"
          src={LoginBg}
          alt="background_Image"
        />
      </div>
      {/* form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black bg-opacity-75 flex rounded-[4px] flex-col sm:top-[25%] top-[20%] absolute z-20 m-auto w-auto sm:w-fit sm:px-16 px-10 pt-10 sm:pb-20 pb-16 items-left text-white"
      >
        <h1 className="mb-8 sm:text-3xl text-2xl cursor-default">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="bg-[#333333] px-5 py-3 border-none rounded-[4px] outline-none sm:w-72 w-auto mb-4"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="bg-[#333333] px-5 py-3 border-none rounded-[4px] outline-none sm:w-72 w-auto mb-4"
          type="text"
          placeholder="Email or phone number"
        />
        <input
          ref={password}
          className="bg-[#333333] px-5 py-3 rounded-[4px] outline-none sm:w-72 w-auto "
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500 my-3 h-6 text-sm text-center">{isError}</p>
        <button
          onClick={handleValidation}
          className="bg-red-600 contrast-125 rounded-[4px] sm:w-72 w-auto py-3"
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
