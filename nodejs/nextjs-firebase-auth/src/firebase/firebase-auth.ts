import { useEffect, useState } from "react";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { createFirebaseApp } from "./client-app";

const app = createFirebaseApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
  connectAuthEmulator(
    auth,
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
  );
}

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
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      if (usr) {
        setAuthUser(usr);
      } else {
        setAuthUser(undefined);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { auth, authUser, googleLogin, isLoading, logout };
}
