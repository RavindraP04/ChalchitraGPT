import { LoginBg } from "../utils/constants";
import Header from "./Header";

const Login = () => {
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
      <div className="bg-black bg-opacity-75 flex rounded-[4px] flex-col top-1/3 relative z-20 m-auto w-fit px-16 pt-10 pb-20 items-left text-white">
        <h1 className="mb-8 text-3xl">Sign in</h1>
        <input className="bg-[#333333] px-5 py-3 border-none rounded-[4px] outline-none w-72 mb-4" type="text" placeholder="Email or phone number"/>
        <input className="bg-[#333333] px-5 py-3 rounded-[4px] outline-none w-72 " type="password" placeholder="Password"/>
        <button className="bg-red-600 contrast-125 rounded-[4px] w-72 py-3 mt-8">Sign in</button>
      </div>
    </div>
  );
};

export default Login;
