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

## Add Tailwind

```
npm add -D concurrently tailwindcss
```

```sh
touch tailwind.config.js
```

```
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
```

package.json

```
    "build": "npm run build:css && remix build",
    "build:css": "tailwindcss -i ./styles/tailwind.css -o ./app/tailwind.css --minify",
    "dev": "concurrently \"npm run dev:css\" \"remix dev\"",
    "dev:css": "tailwindcss -i ./styles/tailwind.css -o ./app/tailwind.css --watch",
```

root.tsx

```
// ...
import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

```
mkdir styles
touch styles/tailwind.css
```

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply bg-slate-50;
  }
}
```

Refresh the page at this point to view Tailwind kick in

Style

```tsx:title=index.tsx
  <header className="bg-cyan-100">
    <div className="flex justify-between container mx-auto pt-5 pb-5">
      <h1 className="text-3xl">Firebase Authentication</h1>
      <nav className="">
        <FirebaseLogin />
      </nav>
    </div>
  </header>
```

Style `firebase-login.tsx`

```
  {!user && (
    <button className="btn" onClick={googleLogin}>
      Login
    </button>
  )}
```

## Add MongoDB

I am using [typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)
over mongoose to connect to database. Remix uses Typescript and Typegoose makes it easy

Add mongoose and typegoose dependency

```
npm install mongoose @typegoose/typegoose
```

Create MenuItem class

```
import { prop } from "@typegoose/typegoose";

export default class MenuItem {
  @prop()
  public itemName: string;
}
```

Create Service

```
import { getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import MenuItem from "../models/menu-item";

mongoose.connect(process.env.MONGODB_URL as string);
export function getMenuItems() {
  const MenuItemModel = getModelForClass(MenuItem);
  return MenuItemModel.find();
}
```

```
touch .env
```

add database url

```
MONGODB_URL=mongodb://root:example@localhost/menu?authSource=admin
```


```
https://remix.run/docs/en/v1/guides/resource-routes#handling-different-request-methods
https://remix.run/docs/en/v1/api/remix#signing-cookies
https://remix.run/docs/en/v1/api/remix#json
https://github.com/satansdeer/firebase-server-auth
```