import { getFirebaseUser } from "@/middleware/firebase";
import { NextApiRequest, NextApiResponse } from "next";

async function getFirebaseUserData(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies && req.cookies.token) {
    try {
      const result = await getFirebaseUser(req.cookies.token);
      return res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Could not process request", error });
    }
  }
  return res.status(401).json({ message: "Not authorized" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getFirebaseUserData(req, res);
    default:
      return res.status(405).send({ message: "Method not allowed" });
  }
}
