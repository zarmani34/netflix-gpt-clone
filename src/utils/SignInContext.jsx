import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

const nameContext = createContext();
const userNameContext = createContext();
const emailContext = createContext();
const passwordContext = createContext();
const rememberMeContext = createContext();
const signInCodeContext = createContext();
const useHandleSubmit = createContext();
const useToggleSignInCode = createContext();
const formMessageContext = createContext();

export const useNameContext = () => useContext(nameContext);
export const useUserNameContext = () => useContext(userNameContext);
export const useEmailContext = () => useContext(emailContext);
export const usePasswordContext = () => useContext(passwordContext);
export const useRemeberMeContext = () => useContext(rememberMeContext);
export const useSignInCodeContext = () => useContext(signInCodeContext);
export const useHandleSubmitContext = () => useContext(useHandleSubmit);
export const useToggleSignInCodeContext = () => useContext(useToggleSignInCode);
export const useFormMessageContext = () => useContext(formMessageContext);

export const SignInContextProvider = ({ children }) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const rememberMe = useRef(null);
  const [signInCode, setSignInCode] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (name.current) {
      const nameValue = name.current.value;
      const emailValue = email.current.value;
      const passwordValue = signInCode ? "" : password.current.value;

      const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(nameValue);
      if (!fullNameRegex) {
        setFormMessage(
          "Invalid name. Please enter at least two words with alphabetic characters only."
        );
        return;
      }
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
          // navigate('/browse')
          updateProfile(user, {
            displayName: nameValue,
          })
            .then(() => {
              
            })
            .catch((error) => {
              setFormMessage(error);
            });

          // ...
        })
        .catch((error) => {
          setFormMessage(error.message);
        });
    } else {
      const emailValue = email.current.value;
      const passwordValue = signInCode ? "" : password.current.value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
      if (!emailRegex) {
        setFormMessage("Invalid email");
        return;
      }

      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          setFormMessage(error.message);
          throw new Error(error);
        });
    }
  };

  const toggleSignInCode = () => {
    setSignInCode(!signInCode);
  };

  return (
    <useHandleSubmit.Provider value={handleSubmit}>
      <useToggleSignInCode.Provider value={toggleSignInCode}>
        <rememberMeContext.Provider value={rememberMe}>
          <passwordContext.Provider value={password}>
            <emailContext.Provider value={email}>
              <nameContext.Provider value={name}>
                  <signInCodeContext.Provider value={signInCode}>
                    <formMessageContext.Provider
                      value={{ formMessage, setFormMessage }}
                    >
                      {children}
                    </formMessageContext.Provider>
                  </signInCodeContext.Provider>
              </nameContext.Provider>
            </emailContext.Provider>
          </passwordContext.Provider>
        </rememberMeContext.Provider>
      </useToggleSignInCode.Provider>
    </useHandleSubmit.Provider>
  );
};
