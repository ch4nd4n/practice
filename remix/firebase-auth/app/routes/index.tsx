import FirebaseLogin from "~/components/firebase-login";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Firebase Authentication</h1>
      <FirebaseLogin />
    </div>
  );
}
