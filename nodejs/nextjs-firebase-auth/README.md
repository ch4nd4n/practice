This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Create Next.js App

Create a nextjs app, I am using the following

```sh
yarn create next-app --typescript --eslint
```

Calling the app `nextjs-firebase-auth`

```sh
cd nextjs-firebase-auth
```

open http://localhost:3000

This shows up default Next.js page

To start off clean slate Update `index.tsx`

```tsx
export default function Home() {
  return (
    <main>
      <h1>Login page</h1>
    </main>
  );
}
```

## Firebase emulator

I am using firebase emulator to for faster. Check if you got firebase installed

```sh
firebase --version
```

Next configure firebase emulator, create a folder to store firebase emulator config etc. Read up here

https://firebase.google.com/docs/emulator-suite/install_and_configure

```sh
firebase emulators:start --import=./.emulator-data --export-on-exit
```

visit http://127.0.0.1:4000/auth

## Adding Firebase

To add Firebase configuration details to your Next.js project, follow these steps:

1. Create a .env.local file in the root of your Next.js project.
2. In the .env.local file, add the following environment variables with your Firebase configuration details:

```sh
NEXT_PUBLIC_FIREBASE_API_KEY=api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=analytic-id
```

Replace api-key, auth-domain, project-id, storage-bucket, sender-id, app-id,
and analytic-id with the corresponding values from your Firebase project.

Note that the environment variable names must start with **NEXT*PUBLIC*** in order
to be accessible on the client-side.

Create a `src/firebase/client-app.ts`

```ts:title=src/firebase/client-app.ts
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

export const createFirebaseApp = () => {
  if (getApps().length <= 0) {
    return initializeApp(firebaseConfig);
  }
};

```

This code initializes a Firebase app using the Firebase SDK in JavaScript.
It creates a firebaseConfig object with configuration details for the app, and exports a
createFirebaseApp function that checks if there are any existing Firebase
apps before creating a new one. This function can be used to ensure that only one Firebase app
instance is created in an application that requires Firebase services.

create src/firebase/firebase-auth.ts

```ts
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return { authUser, googleLogin, logout };
}
```

create src/components/login-button.tsx

```tsx
import useFirebaseAuth from "@/firebase/firebase-auth";

export default function LoginButton() {
  const { authUser, googleLogin, logout } = useFirebaseAuth();
  if (authUser) {
    return (
      <div>
        <span>logged in as {authUser.displayName}</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  return <button onClick={googleLogin}>Google Login</button>;
}
```

Update index.tsx

```tsx
import LoginButton from "@/components/login-button";

export default function Home() {
  return (
    <main>
      <h1>Login page</h1>
      <LoginButton />
    </main>
  );
}
```

This marks the completion of a very basic client side Firebase authentication.
