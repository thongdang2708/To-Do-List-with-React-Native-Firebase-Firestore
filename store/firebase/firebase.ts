// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU0oTVYuEGXVtLLEtsX2DDxPALs5ywlUM",
  authDomain: "to-do-list-289be.firebaseapp.com",
  projectId: "to-do-list-289be",
  storageBucket: "to-do-list-289be.appspot.com",
  messagingSenderId: "213698321899",
  appId: "1:213698321899:web:2123ddd7dd10748f3f4dae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

