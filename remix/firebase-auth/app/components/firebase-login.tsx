import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useState } from "react";
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
          Login
        </button>
      )}
      {user && (
        <>
          {user.displayName}
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
}
