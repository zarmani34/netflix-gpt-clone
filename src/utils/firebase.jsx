// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFl1xLm_HHbVPBPcnhJ9yO4Ev5gKZzvKw",
  authDomain: "netflix-gptclone.firebaseapp.com",
  projectId: "netflix-gptclone",
  storageBucket: "netflix-gptclone.firebasestorage.app",
  messagingSenderId: "1082667725891",
  appId: "1:1082667725891:web:2cebceda270fae293d50f6",
  measurementId: "G-E461ZQ983Q"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();