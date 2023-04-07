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

## Adding Firebase

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
