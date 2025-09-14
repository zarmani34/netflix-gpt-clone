import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import SignInPage from "./pages/SignInPage";
import { useUserContext } from "./utils/UserContext";
import BrowseLayout from "./layouts/BrowseLayout";
import BrowsePage from "./pages/BrowsePAge";
import { browseLoader } from "./utils/browsePageLoader";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";

function App() {
  const user = useUserContext()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element = {<MainLayout/>}  >
          <Route
            index
            element={user ? <Navigate to="/browse" /> : <HomePage />}
            
          />
          <Route
            path="/sign-in"
            element={!user ? <SignInPage /> : <Navigate to="/browse" /> }
            // element= <SignInPage/> 
          />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/404" element={<NotFoundPage />} /> */}
        </Route>
        <Route path='/browse' element={<BrowseLayout/>} >
          <Route
            path="/browse"
            element={user ? user.displayName&&<BrowsePage /> : <Navigate to="/" />}
            loader={browseLoader}
          />
          <Route
            path="/browse/:browsePage"
            element={<BrowsePageHandler/>}
            loader={browseLoader}
          />
          
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

const BrowsePageHandler = () => {
  const { browsePage } = useParams();

  // Valid browsePage values
  const validPages = [
    "Trending Movies",
    "Popular Movies",
    "Top Rated Movies",
    "Popular TV Shows",
    "Discover More",
  ];

  // Check if browsePage is valid
  if (!validPages.includes(browsePage)) {
    return <NotFoundPage />; // Redirect to not found page if invalid
  }

  // Render the BrowsePage if the route is valid
  return <BrowsePage />;
};

export default App;
