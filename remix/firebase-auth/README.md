# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

```sh
npm add dotenv -D
```

Update package.json

```
node -r dotenv/config node_modules/.bin/remix dev
```

```sh
npm run dev # ensure server runs fine
```

```
touch app/config/firebase.js # Add firebase config here
```

Add component `firebase-login.tsx`

```tsx:title=app/components/firebase-login.tsx
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
```
