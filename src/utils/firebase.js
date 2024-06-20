// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH7zrZSsURYWwFEssOJWrfxsOT5pVTTLU",
  authDomain: "chalchitragpt-426915.firebaseapp.com",
  projectId: "chalchitragpt-426915",
  storageBucket: "chalchitragpt-426915.appspot.com",
  messagingSenderId: "812482727456",
  appId: "1:812482727456:web:870645f931e549e4733645",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

