import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const emailContext = createContext();
const passwordContext = createContext();
const rememberMeContext = createContext();
const signInCodeContext = createContext();
const useHandleSubmit = createContext();
const useToggleSignInCode = createContext();
const formMessageContext = createContext();

export const useEmailContext = () => useContext(emailContext);
export const usePasswordContext = () => useContext(passwordContext);
export const useRemeberMeContext = () => useContext(rememberMeContext);
export const useSignInCodeContext = () => useContext(signInCodeContext);
export const useHandleSubmitContext = () => useContext(useHandleSubmit);
export const useToggleSignInCodeContext = () => useContext(useToggleSignInCode);
export const useFormMessageContext = () => useContext(formMessageContext);

export const SignInContextProvider = ({ children }) => {
  const email = useRef(null);
  const password = useRef(null);
  const rememberMe = useRef(null);
  const [signInCode, setSignInCode] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = signInCode ? "" : password.current.value;
    const rememberMeChecked = rememberMe.current.checked;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailRegex) {
      setFormMessage("Invalid email");
      return;
    }
    if (!signInCode && passwordValue.length < 8) {
      setFormMessage("Password lesser than 8 characters");
      return;
    }

    setFormMessage("");

    

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        navigate('/browse')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, ":", errorMessage);
        // ..
      });

  };
  const toggleSignInCode = (e) => {
    setSignInCode(!signInCode);
  };
  
  return (
    <useHandleSubmit.Provider value={handleSubmit}>
      <useToggleSignInCode.Provider value={toggleSignInCode}>
        <rememberMeContext.Provider value={rememberMe}>
          <passwordContext.Provider value={password}>
            <emailContext.Provider value={email}>
              <signInCodeContext.Provider value={signInCode}>
                <formMessageContext.Provider value={formMessage}>
                  {children}
                </formMessageContext.Provider>
              </signInCodeContext.Provider>
            </emailContext.Provider>
          </passwordContext.Provider>
        </rememberMeContext.Provider>
      </useToggleSignInCode.Provider>
    </useHandleSubmit.Provider>
  );
};
