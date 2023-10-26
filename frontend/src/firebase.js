// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbm3BCL9DUsFOyWaL3V1tUAt_iXc5m3JQ",
  authDomain: "stackoverflow-clone-df564.firebaseapp.com",
  projectId: "stackoverflow-clone-df564",
  storageBucket: "stackoverflow-clone-df564.appspot.com",
  messagingSenderId: "975937350162",
  appId: "1:975937350162:web:0ef98b5d1b0371535386cb",
  measurementId: "G-4T71WQHQC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const provider=new GoogleAuthProvider()

