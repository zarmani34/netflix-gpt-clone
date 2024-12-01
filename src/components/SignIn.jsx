import { useEmailContext, useFormMessageContext, useHandleSubmitContext, usePasswordContext, useRemeberMeContext, useSignInCodeContext, useToggleSignInCodeContext } from "@/utils/SignInContext";
import React, { useRef, useState } from "react";

const Signin = () => {

  const email = useEmailContext()
  const password = usePasswordContext()
  const rememberMe = useRemeberMeContext()
  const signInCode = useSignInCodeContext()
  const handleSubmit = useHandleSubmitContext()
  const toggleSignInCode = useToggleSignInCodeContext()
  const formMssg = useFormMessageContext()



  return (
    <div>
        <div
        className="flex justify-center items-center "
        style={{ backgroundImage: "url('/path-to-your-background-image.jpg')",
         }}
      >
      
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-70 text-white px-16 py-16 rounded-lg shadow-lg max-w-md w-full z-10"
        >
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email or mobile number
            </label> */}
            <input
              id="email"
              type="email"
              ref={email}
              placeholder="Email or mobile number"
              className="w-full p-4 rounded-sm bg-transparent text-white border-2 border-[#605f60] focus:outline-none focus:ring-2 focus:ring-red-500"
              // required
            />
          </div>
          {signInCode && <div>
          <p className="my-4 text-center text-xs text-gray-400">
            Message and data rates may apply
          </p>
          </div>}
          {!signInCode &&<div className="mb-4">
            {/* <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label> */}
            <input
              id="password"
              type="password"
              ref={password}
              placeholder="Password"
              className="w-full p-4 rounded-sm bg-transparent text-white border-2 border-[#605f60] focus:outline-none focus:ring-2 focus:ring-red-500"
              // required
            />
          </div>}
          <div className="w-full text-red-500 text-center -mt-2 mb-2"><p>{formMssg}</p></div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-sm font-medium transition"
          >
            {signInCode? 'Send Sign-In code' :'Sign up'}
          </button>
          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                ref={rememberMe}
                className="text-red-500 focus:ring-2 focus:ring-red-500 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-red-500 hover:underline">
              {signInCode? 'Forgot email or Phone number?':'Forgot password?'}
            </a>
          </div>
          <div className="my-6 text-center text-gray-400">OR</div>
          <button
            type="button"
            className="w-full bg-transparent text-white py-2 px-4 rounded-md font-medium transition relative"
            onClick={toggleSignInCode}
          >
            {signInCode? 'Use Password':'Use a Sign-In Code'}
            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-gray-400 bg-opacity-30 hover:bg-opacity-20 rounded-sm" ></div>
          </button>
          <p className="mt-6 text-center text-sm text-gray-400">
            New to Netflix?{" "}
            <a href="/sign-up" className="text-red-500 hover:underline">
              Sign up now.
            </a>
          </p>
          <p className="mt-4 text-center text-xs text-gray-400">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
