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
