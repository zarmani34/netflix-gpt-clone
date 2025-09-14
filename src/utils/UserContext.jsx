import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import Spinner from "@/components/Spinner";
import { GenreContextProvider } from "./GenreContext";
import { useUserNameContext } from "./SignInContext";

const userContext = createContext();
const setUserContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        displayName? setUser({ uid, email,displayName }): setUser({ uid, email,displayName:email })
        
        
      } else {
        setUser(null);
      }
      setLoading(false); // Finish loading when state resolves
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <userContext.Provider value={user}>
        <GenreContextProvider>{children}</GenreContextProvider>
    </userContext.Provider>
  );
};
