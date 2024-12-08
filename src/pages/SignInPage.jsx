import { bgUrl } from "@/utils/urls";
import { useEffect, useState } from "react";
import { SignInContextProvider } from "@/utils/SignInContext";
import Header from "@/components/Header";
import Signin from "@/components/SignIn";

const SignInPage = () => {
  const [signIn, setSignIn] = useState(false);
  useEffect(() => {
    setSignIn(true);
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
      <Header signIn={signIn} />
      <SignInContextProvider>
        <Signin />
      </SignInContextProvider>
      <div className="w-full h-full absolute top-0 left-0 bg-gray-900 bg-opacity-50"></div>
    </div>
  );
};

export default SignInPage;
