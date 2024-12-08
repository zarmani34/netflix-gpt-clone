import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import SignInPage from "./pages/SignInPage";
import Browse from "./components/Browse";
import { useUserContext } from "./utils/UserContext";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element=<MainLayout/> >
        <Route index element=<HomePage/>  />
        <Route path="/sign-in" element=<SignInPage/>  />
      </Route>
    )
  )
  

  return (
    
    <RouterProvider router={router} />

  );
}

export default App;
