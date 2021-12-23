import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjwZI2fp4RkcomTMiESmoaDE7QLn5XDQ0",
  authDomain: "chandankumar-blog-test.firebaseapp.com",
  projectId: "chandankumar-blog-test",
  storageBucket: "chandankumar-blog-test.appspot.com",
  messagingSenderId: "349341802421",
  appId: "1:349341802421:web:cd2cbcd9dc009c854203fc",
  measurementId: "G-B3GM4DJ70Q",
};
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

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Firebase Authentication</h1>
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
