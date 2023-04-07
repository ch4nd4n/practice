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
