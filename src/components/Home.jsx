import React, { useRef, useState } from "react";
import Header from "./Header";
import { vidUrl } from "../utils/urls";
import { auth } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { FaAngleRight } from "react-icons/fa";

const Home = () => {
  const mailRef = useRef();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetStarted = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error
    
    const email = mailRef.current.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (emailRegex) {
      try {
        // Check if the email exists in Firebase Authentication
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        
        const isSignedUp = signInMethods.length > 0
        navigate("/sign-in", { state: { email, isSignedUp } })
      } catch (error) {
        setError("An error occurred. Please try again.");
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }else{
      setError("Invalid email")
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen relative ">
        <div className="w-[95%] sm:w-[80%] md:w-[65%] h-full z-10 rounded-2xl mt-24  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-slate-950 via-transparent">
          
          <div className="relative mb-4 w-full h-[40%] sm:h-[50%] md:h-[65%] bg-transparent border-slate-200 border-t-2 border-l-2 rounded-2xl border-b-0 overflow-hidden ">
            <svg
              className="absolute inset-0 w-full h-full shadow-[0px_10px_60px_15px_black]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath id="videoClip">
                  <path d="M0,0 L100,0 L100,101 Q50,90 0,101 Z" />
                </clipPath>
                <linearGradient id="fadeGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="80%" stopColor="rgba(0,0,0,0.5)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
                </linearGradient>
              </defs>
              <foreignObject
                width="100%"
                height="100%"
                clipPath="url(#videoClip)"
              >
                <video
                  src={vidUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full  object-cover scale-150"
                />
              </foreignObject>
            </svg>
            <div className="w-full h-fit flex flex-col align-middle justify-center absolute left-1/2 -translate-x-1/2 sm:bottom-20 bottom-5 text-slate-100 md:w-[40%] md:bottom-10">
              <h1 className="px-2 sm:px-0 font-bold sm:text-4xl text-3xl text-center">
                Unlimited movies, shows, and more
              </h1>
              <p className=" text-center text font-medium p-2">
                Starts at &#8358;2000. Cancel anytime.
              </p>
            </div>
          </div>
          <div className="w-full text-slate-300 text-center text-base">
            <p>
              Ready to watch? Enter your mail to restart or create your
              membership
            </p>
            <form
              action=""
              className="m-4 flex flex-col sm:flex-row items-center justify-center gap-2"
            >
              <input
                className=" bg-[rgb(32,27,29)] rounded-full p-4 w-full backdrop-blur-md border border-indigo-500"
                ref={mailRef}
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
              <button
               className="w-1/2 py-3 px-2 rounded-3xl bg-[#6C63FF] sm:text-2xl text-lg font-medium text-slate-100 flex items-center justify-center gap-2 cursor-pointer"
               onClick={(e) => handleGetStarted(e)}
               disabled={loading}
               >
                {loading ? "Loading..." : "Get Started"}
                <FaAngleRight/>
              </button>
            </form>
            {error && <p className="text-indigo-200 font-medium text-lg -mt-2">{error}</p>}
          </div>
        </div>
        <div className=" bg-vid w-full h-full absolute top-0 left-0 overflow-hidden ">
          <video
            src={vidUrl}
            autoPlay
            loop
            muted
            className=" w-full h-full object-cover scale-150 from-[rgb(98,73,79)] via-transparent to-[rgb(98,73,79)]"
          ></video>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-xl inset-0 bg-gradient-to-b from-[rgb(98,73,79)] via-transparent to-[rgb(98,73,79)] "></div>
      </div>
    </>
  );
};

export default Home;
