import useFirebaseAuth, {
  recaptcha,
  signInWithPhone,
} from "@/firebase/firebase-auth";
import { PhoneAuthentication } from "./phone-signin";
import { useEffect } from "react";

export default function LoginButton() {
  useEffect(() => {
    if (window) {
      // @ts-ignore
      window.recaptchaVerifier = recaptcha(() => {});
    }
  }, []);
  const { authUser, logout } = useFirebaseAuth();
  if (authUser) {
    return (
      <div>
        <span>logged in as {authUser.displayName ?? authUser.phoneNumber}</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  return <PhoneAuthentication />;
}
