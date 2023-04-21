import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      setUser(userCredential.user);
      return userCredential.user; // Add this line to return the user object
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
