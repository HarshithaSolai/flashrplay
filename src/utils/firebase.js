// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1eIhGhS20aNHf51eaGYRU4PmC1-tkS0g",
  authDomain: "flash-r-play.firebaseapp.com",
  projectId: "flash-r-play",
  storageBucket: "flash-r-play.appspot.com",
  messagingSenderId: "1089907838599",
  appId: "1:1089907838599:web:86a78dbc80fb6562c23222",
  measurementId: "G-8424D0T28R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);


export default app;

