import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/utils/firebase";
import { useUserContext } from "@/utils/UserContext";

const useIsUserVAlid = () => {
  const {user:currentUser, setUser} = useUserContext()
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        setUser({ uid, email, displayName });
        navigate("/browse");
      } else {
        setUser(null);
        navigate(location.pathname === "/sign-in" ? "/sign-in" : "/", { replace: true });
      }
      setLoading(false); // Finish loading when state resolves
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  
  return { loading };
};

export default useIsUserVAlid;
