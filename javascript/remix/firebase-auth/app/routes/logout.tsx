import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";

export const action: ActionFunction = async ({ request }) => {
  console.log("ActionFunction");
  return redirect("/login", {
    headers: {
      "Set-Cookie": null,
    },
  });
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
