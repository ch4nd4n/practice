import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { createFirebaseApp } from "./client-app";

const app = createFirebaseApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function googleLogin() {
  return signInWithPopup(auth, googleProvider);
}

function logout() {
  return auth.signOut();
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(undefined);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { authUser, googleLogin, isLoading, logout };
}
