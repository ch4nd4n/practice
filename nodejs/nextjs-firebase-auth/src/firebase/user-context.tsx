import { createContext, useContext, useEffect } from "react";
import useFirebaseAuth from "./firebase-auth";
import { User } from "firebase/auth";
import nookies from "nookies";

type UserContextType = {
  authUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const defaultAuthUser: UserContextType = {
  authUser: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const authUserContext = createContext(defaultAuthUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const firebaseAuth = useFirebaseAuth();
  useEffect(() => {
    return firebaseAuth.auth.onIdTokenChanged(async (user: any) => {
      console.log({ user });
      if (!user) {
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);
  return (
    // @ts-ignore
    <authUserContext.Provider value={firebaseAuth}>
      {children}
    </authUserContext.Provider>
  );
}

export const useUser = () => useContext(authUserContext);
