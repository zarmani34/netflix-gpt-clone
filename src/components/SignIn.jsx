import {
  useEmailContext,
  useFormMessageContext,
  useHandleSubmitContext,
  useNameContext,
  usePasswordContext,
  useRemeberMeContext,
  useSignInCodeContext,
  useToggleSignInCodeContext,
} from "@/utils/SignInContext";
import { Link } from "react-router-dom";

const Signin = ({ getStartedMail, isSignedUp, setIsSignedUp }) => {
  const nameRef = useNameContext()
  const mailRef = useEmailContext();
  const password = usePasswordContext();
  const rememberMe = useRemeberMeContext();
  const signInCode = useSignInCodeContext();
  const handleSubmit = useHandleSubmitContext();
  const toggleSignInCode = useToggleSignInCodeContext();
  const {formMessage, setFormMessage} = useFormMessageContext();

  if (getStartedMail){
    mailRef.current.value = getStartedMail
  }

  return (
      <div
        className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[85%]"
        style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-70 text-white p-4 sm:p-16  rounded-lg shadow-lg max-w-md w-full z-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            {isSignedUp ? "Sign In" : "Sign up"}
          </h2>
          {!signInCode && !isSignedUp && (
            <div className="mb-4">
              <input
                id="name"
                type="text"
                ref={nameRef}
                placeholder="Enter your Full name"
                className="w-full p-4 rounded-sm bg-transparent text-white border-2 border-[#605f60] focus:outline-none focus:ring-2 focus:ring-indigo-600"
                // required
              />
            </div>
          )}
          <div className="mb-4">
            <input
              id="email"
              type="email"
              ref={mailRef}
              placeholder="Email"
              className="w-full p-4 rounded-sm bg-transparent text-white border-2 border-[#605f60] focus:outline-none focus:ring-2 focus:ring-indigo-600"
              // required
            />
          </div>
          {signInCode && (
            <div>
              <p className="my-4 text-center text-xs text-gray-400">
                Message and data rates may apply
              </p>
            </div>
          )}
          {!signInCode && (
            <div className="mb-4">
              <input
                id="password"
                type="password"
                ref={password}
                placeholder="Password"
                className="w-full p-4 rounded-sm bg-transparent text-white border-2 border-[#605f60] focus:outline-none focus:ring-2 focus:ring-indigo-600"
                // required
              />
            </div>
          )}
          <div className="w-full text-[#6C63FF] text-center -mt-2 mb-2">
            <p>{formMessage}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6C63FF] hover:bg-opacity-90 text-white py-2 px-4 rounded-sm font-medium transition"
          >
            {signInCode
              ? "Send Sign-In code"
              : isSignedUp
              ? "Sign In"
              : "Sign Up"}
          </button>
          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                ref={rememberMe}
                className="text-[#6C63FF]focus:ring-2 focus:ring-red-500 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            {isSignedUp && (
              <a
                href="/forgot-password"
                className="text-[#6C63FF] hover:underline"
              >
                {signInCode ? "Forgot email ?" : "Forgot password ?"}
              </a>
            )}
          </div>
          {isSignedUp && (
            <>
              <div className="my-6 text-center text-gray-400">OR</div>
              <button
                type="button"
                className="w-full bg-transparent text-white py-2 px-4 rounded-md font-medium transition relative"
                onClick={toggleSignInCode}
              >
                {signInCode ? "Use Password" : "Use a Sign-In Code"}
                <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-gray-400 bg-opacity-30 hover:bg-opacity-20 rounded-sm"></div>
              </button>
            </>
          )}
          {isSignedUp ? (
            <p className="mt-6 text-center text-sm text-gray-400">
              New to Netflix?{" "}
              <Link to="/" className="text-[#6C63FF] hover:underline">
                Sign up now.
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-gray-400">
              Are you an existing user?{" "}
              <Link onClick={() => {setFormMessage(''); setIsSignedUp(!isSignedUp)}} to="/sign-in" className="text-[#6C63FF] hover:underline">
                Sign in now.
              </Link>
            </p>
          )}
          <p className="mt-4 text-center text-xs text-gray-400">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </form>
      </div>
  );
};

export default Signin;
