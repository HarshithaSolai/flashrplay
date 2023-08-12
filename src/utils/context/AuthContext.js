import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { db } from '../firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { useAppContext } from './AppContext'; // Import useAppContext

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Create a document in the userData collection for the new user
      const userDataRef = doc(db, 'userData', userCredential.user.uid);
      await setDoc(userDataRef, {});

      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  
  const logOut = () => {
    signOut(auth);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser:", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // ...

  return (
    <AuthContext.Provider
      value={{ logOut, user, googleSignIn, signUp, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
