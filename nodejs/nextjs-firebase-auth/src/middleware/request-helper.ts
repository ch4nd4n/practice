import { NextApiRequest } from "next";
import { getFirebaseUser } from "./firebase";

export function getAccesstoken(req: NextApiRequest): string | null {
  const token = req.headers.accesstoken;
  return token && typeof token === "string" ? token : null;
}

// export async function isAuthorized(req: NextApiRequest) {
//   const userToken = getAccesstoken(req);
//   const isAuthenticated = userToken ? await getFirebaseUser(userToken) : false;
//   return isAuthenticated;
// }

// export async function getLoggedInUser(req: NextApiRequest) {
//   const userToken = getAccesstoken(req);
//   return userToken ? await getFirebaseUser(userToken) : null;
// }
