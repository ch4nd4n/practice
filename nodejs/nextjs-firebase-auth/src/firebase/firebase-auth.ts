import { useEffect, useState } from "react";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
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

export function signInWithPhone(phoneNumber: string) {
  // @ts-ignore
  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}

/**
 * Phone Auth recaptha verification object
 * @param callback function to call when user is signed in
 * @returns RecaptchaVerifier
 */
export function recaptcha(callback: any) {
  const captchaObject = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response: any) => {
        callback(response);
      },
    },
    auth
  );
  return captchaObject;
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
