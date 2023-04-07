import { createContext, useContext } from "react";
import useFirebaseAuth from "./firebase-auth";
import { User } from "firebase/auth";

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
  return (
    // @ts-ignore
    <authUserContext.Provider value={firebaseAuth}>
      {children}
    </authUserContext.Provider>
  );
}

export const useUser = () => useContext(authUserContext);
