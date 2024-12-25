import admin from "firebase-admin";
import { redirect } from "remix";

const serviceAccount = require("./service-account.json");

if (!admin.apps || admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const expiresIn = 60 * 60 * 24 * 5 * 1000;

export async function createUserSession(idToken: string, cb: Function) {
  return admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      console.log({ sessionCookie });
      return cb(sessionCookie);
    });
}

export async function getUserSession(request: Request) {
  return request.headers.get("Cookie");
}

export async function requireUserId(request: Request) {
  const sessionCookie = (await getUserSession(request)) || "";
  return admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      return decodedClaims;
    })
    .catch((err) => {
      throw redirect("/");
    });
}
