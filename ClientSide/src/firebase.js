// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blogs-925b0.firebaseapp.com",
  projectId: "mern-blogs-925b0",
  storageBucket: "mern-blogs-925b0.appspot.com",
  messagingSenderId: "1087529572571",
  appId: "1:1087529572571:web:6020d65832408ff1c794fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);