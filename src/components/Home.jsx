import React from "react";
import Header from "./Header";
import { vidUrl } from "../utils/urls";

const Home = () => {
  return (
    <>
      <div className="w-full h-dvh relative">
        <div className="px-8 pb-4 w-full h-full z-10  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-slate-950 via-transparent">
          <Header />
          <div
            className="relative mb-4 w-full h-4/6 z-10 bg-transparent border-slate-200 border-t-2 border-l-2 rounded-2xl border-b-0 overflow-hidden "
            
          >
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
            <div className="w-4/6 h-fit flex flex-col align-middle justify-center absolute left-1/2 -translate-x-1/2 bottom-20 text-slate-100">
              <h1 className="font-bold text-4xl text-center " >Unlimited movies, shows, and more</h1>
              <p className=" text-center text font-medium p-2">Starts at &#8358;2000. Cancel anytime.</p>
            </div>
          </div>
          <div className="w-full text-slate-300 text-center text-base">
          <p>Ready to watch? Enter your mail to restart or create your membership</p>
          <form action="" className="m-4 flex flex-row align-middle justify-center gap-2" >
            <input className=" bg-[rgb(32,27,29)] rounded-full p-4 w-1/2 backdrop-blur-md border border-slate-300" type="email" placeholder="Email address" autoComplete="email"/>
            <button className="w-1/3 rounded-full bg-red-600 text-2xl font-medium text-slate-100">Get Started</button>
          </form>
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
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-xl inset-0 bg-gradient-to-b from-[rgb(98,73,79)] via-transparent to-[rgb(98,73,79)] " ></div>
        
      </div>
    </>
  );
};

export default Home;
