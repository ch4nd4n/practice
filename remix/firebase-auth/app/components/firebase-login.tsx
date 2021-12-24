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
  signInWithPopup(auth, provider).then((result) => {
    console.log({ result });
  });
}

function logout() {
  auth.signOut();
}

export default function FirebaseLogin() {
  const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (result) => {
    if (result) setUser(result);
  });
  return (
    <>
      {!user && <button onClick={googleLogin}>Login</button>}
      {user && (
        <>
          {user.displayName}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
}
