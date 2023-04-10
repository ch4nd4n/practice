import admin, { credential } from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";

const str = process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string;

const serviceAccount = JSON.parse(str);

if (getApps().length <= 0) {
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export function getFirebaseUser(token: string) {
  return admin.auth().verifyIdToken(token);
}
