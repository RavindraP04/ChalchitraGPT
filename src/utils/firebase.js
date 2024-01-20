// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKzFdn7MYk43dipwMryHzK3xupVcfdX2k",
  authDomain: "netflixgpt-p04.firebaseapp.com",
  projectId: "netflixgpt-p04",
  storageBucket: "netflixgpt-p04.appspot.com",
  messagingSenderId: "580325202955",
  appId: "1:580325202955:web:11697e4b45aacaac3abb0e",
  measurementId: "G-K76B3YVMV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

