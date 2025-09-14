import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./utils/UserContext";
import { SignInContextProvider } from "./utils/SignInContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignInContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SignInContextProvider>
  </StrictMode>
);
