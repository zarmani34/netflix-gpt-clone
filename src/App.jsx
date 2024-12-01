import "./App.css";
import Faq from "./components/Faq";
import Header from "./components/Header";
import Home from "./components/Home";
import Join from "./components/Join";
import MovieShowcase from "./components/MovieShowcase";
import SignInPage from "./components/SignInPage";

function App() {
  return (
    <>
      <Home />
      <MovieShowcase />
      <Join />
      <Faq />
      <SignInPage />
    </>
  );
}

export default App;
