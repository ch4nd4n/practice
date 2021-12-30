import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { HiLogout } from "@react-icons/all-files/hi/HiLogout";

import firebaseConfig from "~/config/firebase";

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

function googleLogin() {
  signInWithPopup(auth, provider);
}

function logout() {
  auth.signOut();
}

export default function FirebaseLogin() {
  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (result) => {
    result ? setUser(result) : setUser(null);
  });
  return (
    <>
      {!user && (
        <button className="btn" onClick={googleLogin}>
          <FaGoogle />
        </button>
      )}
      {user && (
        <>
          {user.displayName}
          <button className="btn" onClick={logout}>
            <HiLogout />
          </button>
        </>
      )}
    </>
  );
}
