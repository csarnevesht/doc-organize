import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { firebaseAuth, googleProvider, facebookProvider } from '../firebase';
import { User } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = () => {
    firebaseAuth.signInWithPopup(googleProvider);
  };

  const loginWithFacebook = () => {
    firebaseAuth.signInWithPopup(facebookProvider);
  };

  const signupWithEmail = (email: string, password: string) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, loginWithFacebook, signupWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
