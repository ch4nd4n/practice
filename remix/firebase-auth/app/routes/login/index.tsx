import { initializeApp, getApps } from "firebase/app";

import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

import { useState } from "react";
``;
import Layout from "~/components/layout";
import firebaseConfig from "~/config/firebase";

if (getApps().length === 0) initializeApp(firebaseConfig);
const auth = getAuth();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export default function LoginIndex() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function login() {
    signInWithEmailAndPassword(auth, username, password)
      .then((user: UserCredential) => {
        user.user
          .getIdToken()
          .then((idToken) => {
            return fetch("/session", {
              method: "POST",
              body: JSON.stringify({ idToken }),
            });
          })
          .then(() => {
            // @ts-ignore
            window.location = "/dashboard";
          });
      })
      .catch((err) => console.error({ err }));
  }

  return (
    <Layout>
      <h1 className="font-bold text-3xl">Login Form</h1>
      <div className="pb-5">
        <input
          placeholder="email"
          onChange={(e) => setUsername(e.currentTarget.value)}
          className="border p-3"
        />
      </div>
      <div className="pb-5">
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="border p-3"
        />
      </div>
      <button onClick={login}>Login</button>
    </Layout>
  );
}
