import { browsePage } from "@/utils/browsePages";
import { auth } from "@/utils/firebase";
import { useUserContext } from "@/utils/UserContext";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import { model } from "@/utils/geminiAi";
import { gptQuery } from "@/utils/urls";

const UserHeader = () => {
  const user = useUserContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInput = useRef(null);

  const [searchOverlay, setSearchOverLay] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");
  const [aiMovieResult, setAiMovieResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Close search when clicking outside
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (searchInputText && searchOverlay) {
      handleGptSearch();
    }
  }, [searchInputText, searchOverlay]);
  
  const handleGptSearch = async () => {
    if (!searchInputText || isSearching) return; 
    setIsSearching(true);
    try {
      const prompt = gptQuery(searchInputText);
      const result = await model.generateContent(prompt);
      const movieList = result.response.text().replace(/\n/g, " ").split(",").map((movie) => movie.trim());
      setAiMovieResult(movieList)
      
    } catch (error) {
      console.error("Error fetching GPT search results:", error);
    }finally {
      setIsSearching(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleSearchOverlay = async () => {
    if (isExpanded && searchInput.current) {
      const value = searchInput.current.value;
      if (value !== "") {
        setSearchInputText(value);
        setSearchOverLay(true);
      }
    }
  };

  // const prompt = gptQuery(searchInputText);
  // const handleGptSearch = async () => {
  //     const result = await model.generateContent(prompt);
  //     console.log(result.response.text());
  //     console.log(result.response.text().replace(/\n/g, " ").split(","));
  //   };

  const closeSearchOverlay = () => {
    if (searchInput.current) {
      searchInput.current.value = "";
    }
    setSearchOverLay(false);
    setAiMovieResult([]);
    setSearchInputText("");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={
        isScrolled
          ? "py-2 sm:py-4 fixed w-full bg-gray-900 flex flex-row justify-between items-center z-50"
          : "sm:py-4 fixed w-full bg-transparent flex flex-row justify-between items-center z-50"
      }
    >
      <div className="flex items-center">
        <Link to="/">
          <div className="w-64 hidden sm:block">
            <img src="/streamHaven2.svg" alt="" />
          </div>
          <div className="w-20 sm:hidden">
            <img src="/shMobile.svg" alt="" />
          </div>
        </Link>
        <div className="relative group inline-block z-10">
          {/* Trigger Button */}
          <h2
            className="pl-2 bg-transparent text-[#6c63ff] font-semibold text-xl rounded-md cursor-pointer"
            onMouseEnter={() => setBrowseOpen(true)}
            onMouseLeave={() => setBrowseOpen(false)}
          >
            Browse
          </h2>

          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 mt-2 w-44 bg-indigo-500 border border-indigo-800 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
              browseOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => setBrowseOpen(true)}
            onMouseLeave={() => setBrowseOpen(false)}
          >
            {browsePage.map((item) => (
              <Link
                state={{ item }}
                key={item.id}
                to={`/browse/${item.label}`}
                className="block px-4 py-2 text-indigo-100 hover:bg-indigo-200 hover:text-indigo-800"
                onClick={() => setBrowseOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          ref={searchRef}
          className="flex items-center justify-end space-x-2"
        >
          {/* Search Input */}
          <div
            className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "w-32 sm:w-48" : "w-0"
            }`}
          >
            <input
              type="text"
              ref={searchInput}
              placeholder="Search..."
              className="w-full px-4 py-2 placeholder:text-slate-200 text-slate-100 border-2 border-[#6c63ff] bg-gray-900 rounded-l-md focus:outline-none"
            />
          </div>
          {/* Search Button */}
          <button
            onClick={() => {
              toggleExpand();
              searchInput.current.focus();
              handleSearchOverlay();
            }}
            className="flex items-center justify-center w-10 h-10 bg-[#6c63ff] text-white rounded-full focus:outline-none hover:bg-opacity-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17.65 12a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
              />
            </svg>
          </button>
        </div>
        <div className="relative group inline-block z-10">
          <div
            className="rounded-full w-10 h-10 bg-[#6F66FF] flex items-center justify-center text-indigo-100 font-semibold text-xl cursor-pointer"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            {user.displayName[0]?.toUpperCase()}
          </div>
          <div
            className={`absolute right-0 mt-2 w-44 bg-indigo-500 border border-indigo-800 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
              profileOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <p
              className="block px-4 py-2 text-indigo-100 hover:bg-indigo-200 hover:text-indigo-800 cursor-pointer"
              onClick={() => {
                setProfileOpen(false);
                handleSignOut();
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
      {searchOverlay && (
        <SearchOverlay
          closeOverlay={closeSearchOverlay}
          searchInputText={searchInputText}
          aiMovieResult={aiMovieResult}
        />
      )}
    </div>
  );
};

export default UserHeader;
