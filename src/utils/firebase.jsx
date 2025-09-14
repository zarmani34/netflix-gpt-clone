// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwUph1CxNbw9WwTOa3DzFlgsMGZPwK_Bw",
  authDomain: "stream-haven-5e6e0.firebaseapp.com",
  projectId: "stream-haven-5e6e0",
  storageBucket: "stream-haven-5e6e0.firebasestorage.app",
  messagingSenderId: "689400386208",
  appId: "1:689400386208:web:1c03586f9e50bb88d8afc5",
  measurementId: "G-5RJS3G97PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();