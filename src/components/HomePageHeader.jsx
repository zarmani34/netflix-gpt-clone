import React from "react";
import { Link, useLocation } from "react-router-dom";

const HomePageHeader = ({}) => {
  const location = useLocation();

  return (
    <div className="py-1 sm:px-8 fixed w-full bg-transparent flex flex-row justify-between items-center z-50 bg-gradient-to-b from-slate-950 to-[rgb(98,73,79)">
      <Link to="/">
        <div className="w-64 hidden sm:block">
          <img src="/streamHaven2.svg" alt="" />
        </div>
        <div className="w-20 sm:hidden">
            <img src="/shMobile.svg" alt="" />
          </div>
      </Link>
      {location.pathname !== "/sign-in" && (
        <div>
          <Link to="/sign-in">
            <button className="bg-[#6C63FF] px-4 py-2 rounded-2xl font-medium text-white">
              Sign in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePageHeader;
