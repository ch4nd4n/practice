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

Let's create a Next.js app called nextjs-firebase-auth. We'll use the following command to set it up:

```sh
yarn create next-app --typescript --eslint
```

Once it's done, we can navigate to the app directory using cd nextjs-firebase-auth and open up the default Next.js page by visiting http://localhost:3000.

To start fresh, let's update index.tsx and set up a basic login page. We can do this by adding the following code:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Login page</h1>
    </main>
  );
}
```

Now, if we visit http://localhost:3000, we should see our new login page.

## Firebase emulator

To speed up development, I am using the Firebase emulator. You can check if you have Firebase installed by running:

```sh
firebase --version
```

Next, I'll configure the Firebase emulator by creating a folder to store the emulator configuration data. You can read more about this process
https://firebase.google.com/docs/emulator-suite/install_and_configure

```sh
firebase emulators:start --import=./.emulator-data --export-on-exit
```

Once the emulator is running, you can visit http://127.0.0.1:4000/auth to access the authentication emulator.

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

create `src/firebase/firebase-auth.ts`

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

## Redirect user if not logged in

Sometimes, we want to send users back to the homepage if they're not logged in. Here's how you can do it:

1. Make a loading screen while Firebase checks if the user is logged in.
2. Create a dashboard page and check if the user is logged in using useEffect.
3. If they're not logged in, redirect them back to the homepage.

```tsx
import LoginButton from "@/components/login-button";
import useFirebaseAuth from "@/firebase/firebase-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { authUser, isLoading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!authUser) {
        router.push("/");
      }
    }
  }, [authUser, router, isLoading]);
  return (
    <>
      <h1>Dashboard</h1>
      <LoginButton />
    </>
  );
}
```

Update `firebase-auth.ts` refer to the following

```diff
@@ -22,6 +22,7 @@ function logout() {

 export default function useFirebaseAuth() {
   const [authUser, setAuthUser] = useState<User>();
+  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser) => {
@@ -30,9 +31,10 @@ export default function useFirebaseAuth() {
       } else {
         setAuthUser(undefined);
       }
+      setIsLoading(false);
     });
     return () => unsubscribe();
   }, []);

-  return { authUser, googleLogin, logout };
+  return { authUser, googleLogin, isLoading, logout };
 }
```

If you are not logged in and try to visit `/dashboard` it will throw you back to index page

## Hooking in Firebase emulator

In order to hook up the emulator, the connectAuthEmulator function is being called with the Firebase Authentication object and the host for the emulator. The emulator host is defined in the .env.local file with the variable name NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST.

This allows for the app to use the Firebase Authentication emulator when running locally, instead of the actual Firebase service. This can be useful for testing purposes and can speed up development by avoiding network latency. The .env.local file needs to be created with the appropriate values, and the app may require a restart for the changes to take effect.

Update `firebase-auth.ts` refer to the following patch.

```diff
 import { useEffect, useState } from "react";
 import {
+  connectAuthEmulator,
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
@@ -12,6 +13,13 @@ const app = createFirebaseApp();
 const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider();

+if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
+  connectAuthEmulator(
+    auth,
+    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
+  );
+}
+
 export function googleLogin() {
   return signInWithPopup(auth, googleProvider);
 }
```

Add following `.env.local`

```sh
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=http://localhost:9099
```

The code changes described in the previous code block are intended to hook in the Firebase emulator in a Next.js app for authentication. After making these changes, the app should be restarted to pick up the new configuration.

Once the app is restarted with the updated configuration, refreshing the page will allow the app to authenticate against the local emulator instead of the production Firebase environment. This means that you can test the authentication flow in a local environment without affecting any data or users in the production environment.

With the emulator running, you can also create new users or sign in with existing ones using Google sign-in, and view the accounts created. This allows you to test the app's behavior with different user scenarios in a controlled environment.

To disable the emulator, you can comment out or remove the following line from your .env.local file `NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`

This environment variable is used to configure your Firebase client to use the local emulator instead of the real Firebase authentication service. By removing it, your app will default to using the real Firebase service.
