import React from "react";
import { Link } from "react-router-dom";

const Header = ({ signIn }) => {
  return (
    <div
      className={
        signIn
          ? "py-1 px-8 relative bg-transparent flex flex-row justify-between align-middle z-10"
          : "py-4 relative bg-transparent flex flex-row justify-between items-center z-10"
      }
    ><Link to="/" >
      <div className={signIn ? "w-64" : "w-64"}>
        <img src='/streamHaven2.svg' alt="" />
      </div>
      </Link>
      {!signIn && (
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

export default Header;
