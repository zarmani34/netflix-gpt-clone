import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";


const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        setUser({uid, email, displayName});
        navigate('/browse')
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
  },[]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};
