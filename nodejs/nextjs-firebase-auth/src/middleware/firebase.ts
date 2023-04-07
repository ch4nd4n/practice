import admin, { credential } from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";

const str = process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string;

const serviceAccount = JSON.parse(str);

if (getApps().length <= 0) {
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export async function getFirebaseUser(token: string) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch (error) {
    console.log({ error });
    console.log({ err: "invalid token" });
  }
  return null;
}
