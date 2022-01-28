import { ActionFunction, json } from "remix";
import { createUserSession } from "~/utils/session.server";
export const action: ActionFunction = async ({ request }) => {
  if (request.method === "POST") {
    const payload = await request.json();
    const { idToken } = payload;
    return createUserSession(idToken, (cookie: string) => {
      console.log({ cookie });
      return json(
        { idToken },
        {
          headers: {
            "Set-Cookie": cookie,
          },
        }
      );
    });
  }
  return json({ message: "Method not allowed" }, 405);
};
