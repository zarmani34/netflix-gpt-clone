import { bgUrl } from "@/utils/urls";
import { useEffect, useState } from "react";
import { SignInContextProvider } from "@/utils/SignInContext";
import Header from "@/components/Header";
import Signin from "@/components/SignIn";
import { useLocation } from "react-router-dom";

const SignInPage = () => {
  const getStartedDetails = useLocation()
  const [getStartedMail, setGetStartedMail] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(true)
  

  useEffect(() => {
    if (getStartedDetails.state){
      const {email, isSignedUp} = getStartedDetails.state
      setGetStartedMail(email)
      setIsSignedUp(isSignedUp)
    }
  });

  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header  />
      <SignInContextProvider>
        <Signin getStartedMail={getStartedMail} isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp} />
      </SignInContextProvider>
      <div className="w-full h-full absolute top-0 left-0 bg-gray-900 bg-opacity-50"></div>
    </div>
  );
};

export default SignInPage;
