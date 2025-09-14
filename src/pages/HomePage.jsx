import Faq from "@/components/Faq";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Join from "@/components/Join";
import MovieShowcase from "@/components/MovieShowcase";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Header />
      <Home />
      <MovieShowcase />
      <Join />
      <Faq />
    </>
  );
};

export default HomePage;
