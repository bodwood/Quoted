'use client'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { createContext, useContext, useEffect, useState } from 'react';

//Grabs the auth object from firebase
const auth = getAuth(firebase_app);

//Creates a context for the auth state
export const AuthContext = createContext({});

//Custom hook to grab the auth context
export const useAuthContext = () => useContext(AuthContext);

//Provider component that wraps app and makes auth object available to any child component that calls useAuthContext().
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
   //Subscribes to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     //If the user is present, update the user state with the authenticated user
      if (user) {
        setUser(user);
        //If the user is not present, set the user state to null
      } else {
        setUser(null);
      }
      //Set loading to false
      setLoading(false);
        console.log('User:', user);
    });

    return () => unsubscribe();
  }, []);

  // Renders the AuthContext.Provider component to make the user state available to child components
  return <AuthContext.Provider value={{ user }}>{loading ? <div>Loading...</div> : children}</AuthContext.Provider>;
};
